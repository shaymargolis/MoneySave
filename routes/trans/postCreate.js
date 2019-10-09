
const mongoose = require('mongoose');
const Transaction = mongoose.model("Transaction");
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
    _transaction_tags: tags_arr
  });

  return type;
}

function createTransaction(trans_type, sum, is_outcome, datetime) {
  var trans = new Transaction({
    _transaction_type: trans_type,
    is_outcome: is_outcome,
    datetime: datetime,
    sum: sum
  });

  return trans;
}

function saveTypeAndSaveTransaction(obj, body, res) {
  obj.save();

  var trans = createTransaction(obj, body.sum, body.is_outcome, body.datetime);
  trans.save();

  res.redirect('/?action=createTransaction&result=success');
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
