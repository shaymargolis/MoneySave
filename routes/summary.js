const moment = require('moment');
const mongoose = require('mongoose');

const Transaction = mongoose.model("Transaction");
const PeriodicTransaction = mongoose.model("PeriodicTransaction");
const TransactionType = mongoose.model("TransactionType");
const TransactionTag = mongoose.model("TransactionTag");

module.exports = async (req, res) => {
  var tags = await TransactionTag.find();
  var sum_tags = {};
  var recieve_tags = {};
  var total_spent = 0;
  var total_recieved = 0;

  for (let tag of tags) {
    var trans_types = await TransactionType.find({
      _transaction_tag: tag._id,
      is_outcome: false
    });

    var transactions = await Transaction.find({
      datetime: {
        $gte: moment().startOf('month').toDate(),
        $lte: moment().endOf('month').toDate()
      },
      _transaction_type: trans_types
    });

    var periodic = await PeriodicTransaction.find({
      _transaction_type: trans_types
    });

    transactions = transactions.concat(periodic);

    recieve_tags[tag.title] = {sum: 0, color: tag.color};

    for (let trans of transactions) {
      recieve_tags[tag.title].sum += trans.sum;
    }

    total_recieved += recieve_tags[tag.title].sum;
  }

  for (let tag of tags) {
    var trans_types = await TransactionType.find({
      _transaction_tag: tag._id,
      is_outcome: true
    });

    var transactions = await Transaction.find({
      datetime: {
        $gte: moment().startOf('month').toDate(),
        $lte: moment().endOf('month').toDate()
      },
      _transaction_type: trans_types
    });

    var periodic = await PeriodicTransaction.find({
      _transaction_type: trans_types
    });

    transactions = transactions.concat(periodic);

    sum_tags[tag.title] = {sum: 0, color: tag.color};

    for (let trans of transactions) {
      sum_tags[tag.title].sum += trans.sum;
    }

    total_spent += sum_tags[tag.title].sum;
  }

  if (total_recieved > total_spent) {
    sum_tags["נותר"] = {sum: total_recieved-total_spent, color: "gray"};
  }

  var tag_values = Object.keys(sum_tags);
  var tag_colors = [];
  var tag_sums = [];

  for (let tag of tag_values) {
    tag_colors.push(sum_tags[tag].color);
    tag_sums.push(sum_tags[tag].sum);
  }

  res.render("summary", {
    remaining_sum: total_recieved-total_spent,
    spending_circle: {
      labels: tag_values,
      colors: tag_colors,
      data: tag_sums
    }
  })
};
