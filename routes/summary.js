const moment = require('moment');
const mongoose = require('mongoose');

const User = mongoose.model("User");
const Transaction = mongoose.model("Transaction");
const PeriodicTransaction = mongoose.model("PeriodicTransaction");
const TransactionType = mongoose.model("TransactionType");
const TransactionTag = mongoose.model("TransactionTag");

function getChartJsObject(tags) {
  var tag_values = Object.keys(tags);
  var tag_colors = [];
  var tag_sums = [];

  for (let tag of tag_values) {
    tag_colors.push(tags[tag].color);
    tag_sums.push(tags[tag].sum);
  }

  return {
    labels: tag_values,
    colors: tag_colors,
    data: tag_sums
  };
}

async function getTagDescriptions(tags, is_outcome, user) {
  var total_sum = 0;
  var tag_desc = {};

  for (let tag of tags) {
    var trans_types = await TransactionType.find({
      _transaction_tag: tag._id,
      _user: user,
      is_outcome: is_outcome
    });

    var transactions = await Transaction.find({
      datetime: {
        $gte: moment().startOf('month').toDate(),
        $lte: moment().endOf('month').toDate()
      },
      _transaction_type: trans_types
    });

    var periodic = await PeriodicTransaction.find({
      start_month: {
        $lte: new Date()
      },
      $or: [
        {end_month: null},
        {end_month: {$gte: new Date()}}
      ],
      _transaction_type: trans_types
    });

    transactions = transactions.concat(periodic);

    tag_desc[tag.title] = {sum: 0, color: tag.color};

    for (let trans of transactions) {
      tag_desc[tag.title].sum += trans.sum;
    }

    total_sum += tag_desc[tag.title].sum;
  }

  return {total_sum: total_sum, tag_desc: tag_desc};
}

module.exports = async (req, res) => {
  var user = req.user;

  var tags = await TransactionTag.find({
    _user: user
  });

  var spent = await getTagDescriptions(tags, true, user);
  var earned = await getTagDescriptions(tags, false, user);

  var total_spent = spent.total_sum;
  var spent_tags = spent.tag_desc;
  var total_earned = earned.total_sum;
  var earned_tags = earned.tag_desc;

  if (total_earned > total_spent) {
    spent_tags["נותר"] = {sum: total_earned-total_spent, color: "gray"};
  }

  var all = await Transaction.find({
    _user: req.user
  })
  .limit(3)
  .populate({
      path: "_transaction_type",
      populate: {
        path: "_transaction_tag",
      }
  }).sort({"datetime": -1});

  res.render("summary", {
    page: "summary",
    remaining_sum: total_earned-total_spent,
    spending_circle: getChartJsObject(spent_tags),
    earning_circle: getChartJsObject(earned_tags),
    moment: require('moment'),
    trans_list: all
  })
};
