const moment = require('moment');
const mongoose = require('mongoose');

const Transaction = mongoose.model("Transaction");
const TransactionType = mongoose.model("TransactionType");
const TransactionTag = mongoose.model("TransactionTag");

module.exports = async (req, res) => {
  var tags = await TransactionTag.find();
  var sum_tags = {};
  var total_spent = 0;

  for (let tag of tags) {
    var trans_types = await TransactionType.find({
      _transaction_tag: tag._id
    });

    var transactions = await Transaction.find({
      datetime: {
        $gte: moment().startOf('month').toDate(),
        $lte: moment().endOf('month').toDate()
      },
      _transaction_type: trans_types
    });

    sum_tags[tag.title] = {sum: 0, color: tag.color};

    for (let trans of transactions) {
      sum_tags[tag.title].sum += trans.sum;
    }

    total_spent += sum_tags[tag.title].sum;
  }

  var tag_values = Object.keys(sum_tags);
  var tag_colors = [];
  var tag_sums = [];

  for (let tag of tag_values) {
    tag_colors.push(sum_tags[tag].color);
    tag_sums.push(sum_tags[tag].sum);
  }

  res.render("summary", {spending_circle: {
    labels: tag_values,
    colors: tag_colors,
    data: tag_sums
  }
  })
};
