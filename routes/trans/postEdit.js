
const mongoose = require('mongoose');
const moment = require('moment');

const TransactionService = require('../../service/TransactionService');

const User = mongoose.model("User");
const Transaction = mongoose.model("Transaction");
const TransactionType = mongoose.model("TransactionType");
const TransactionTag = mongoose.model("TransactionTag");

module.exports = async (req, res) => {
  var body = req.body;

  var transaction = req.trans;

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

  TransactionService.updateTransaction(
    transaction,
    req.user,
    body.is_outcome,
    moment(body.datetime, format="DD/MM/YYYY HH:mm"),
    body.sum,
    body.type,
    body.tag
  ).then(function(trans) {
    res.redirect('/trans/all?action=updateTransaction&result=success')
  }).catch(function(err) {
    res.status(500).json({err: { message: err.message, stack: err.stack }})
  })
};
