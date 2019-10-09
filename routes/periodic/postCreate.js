
const mongoose = require('mongoose');
const PeriodicTransaction = mongoose.model("PeriodicTransaction");
const TransactionType = mongoose.model("TransactionType");
const TransactionTag = mongoose.model("TransactionTag");

async function createTransactionType(title, tags) {
  // Find the tags
  var tags_str_arr = tags.split(",");
  var tags_arr = [];

  for (tag in tags_str_arr) {
    var tag_obj = await TransactionTag.findOne({title: tag}).lean(true).exec();

    if (tag_obj != null)
      tags_arr.push(tag_obj);
  }

  // Create the type
  var type = new TransactionType({
    title: title,
    _transaction_tags: tags_arr,
    _user: "5d9c6f8640c69501a866cf07"
  });

  return type;
}

function createTransaction(trans_type, sum, is_outcome, period) {
  var trans = new PeriodicTransaction({
    _transaction_type: trans_type,
    is_outcome: is_outcome,
    period: period,
    sum: sum
  });

  return trans;
}

function saveTypeAndSaveTransaction(obj, body, res) {
  obj.save();

  var trans = createTransaction(obj, body.sum, body.is_outcome, body.period);
  trans.save();

  res.redirect('/periodic/all?action=createTransaction&result=success');
}

module.exports = (req, res) => {
  var body = req.body;

  // Try to get transactionType
  TransactionType.findOne({title: body.type}, function(err,obj) {
    if (obj == null) {
      // Create the TransactionType
      createTransactionType(body.type, body.tags).then(function(obj) {
        saveTypeAndSaveTransaction(obj, body, res);
      });
      return;
    }

    saveTypeAndSaveTransaction(obj, body, res);
  });
};
