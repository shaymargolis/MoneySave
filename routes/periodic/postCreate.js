
const mongoose = require('mongoose');

const PeriodicTransactionService = require('../../service/PeriodicTransactionService');

const User = mongoose.model("User");
const Transaction = mongoose.model("Transaction");
const TransactionType = mongoose.model("TransactionType");
const TransactionTag = mongoose.model("TransactionTag");

module.exports = async (req, res) => {
  var body = req.body;

  var user = await User.findOne({ _id: "5d9c6f8640c69501a866cf07" });

  PeriodicTransactionService.newTransaction(
    user,
    body.is_outcome,
    body.start_month,
    body.end_month,
    body.sum,
    body.type,
    body.tag
  ).catch(function(err) {
    res.status(500).json({err: err})
  }).then(function(trans) {
    res.redirect('/periodic/all?action=createTransaction&result=success')
  })
};
