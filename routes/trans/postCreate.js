
const mongoose = require('mongoose');
var moment = require('moment');

const TransactionService = require('../../service/TransactionService');

const User = mongoose.model("User");
const Transaction = mongoose.model("Transaction");
const TransactionType = mongoose.model("TransactionType");
const TransactionTag = mongoose.model("TransactionTag");

module.exports = async (req, res) => {
  var body = req.body;

  var user = await User.findOne({ _id: "5d9c6f8640c69501a866cf07" });

  TransactionService.newTransaction(
    user,
    body.is_outcome,
    moment(body.datetime, format="DD/MM/YYYY HH:mm"),
    body.sum,
    body.type,
    body.tags
  ).then(function(trans) {
    res.redirect('/trans/all?action=createTransaction&result=success')
  }).catch(function() {
    res.status(500).json({})
  })
};
