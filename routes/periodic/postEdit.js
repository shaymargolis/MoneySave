
const mongoose = require('mongoose');

const PeriodicTransactionService = require('../../service/PeriodicTransactionService');

const User = mongoose.model("User");
const PeriodicTransaction = mongoose.model("PeriodicTransaction");
const Transaction = mongoose.model("Transaction");
const TransactionType = mongoose.model("TransactionType");
const TransactionTag = mongoose.model("TransactionTag");

module.exports = async (req, res) => {
  var body = req.body;

  var transaction = req.periodic;

  if (transaction == null) {
    res.status(404).json({err: "not found"});
    return;
  }

  transaction = transaction.populate({
    path: "_transaction_type",
    populate: {
      path: "_transaction_tag",
    }
  });

  PeriodicTransactionService.updateTransaction(
    transaction,
    req.user,
    body.is_outcome,
    body.start_month,
    body.end_month,
    body.sum,
    body.type,
    body.tag
  ).then(function(trans) {
    res.redirect('/periodic/all?action=updateTransaction&result=success')
  }).catch(function(err) {
    res.status(500).json({err: { message: err.message, stack: err.stack }})
  })
};
