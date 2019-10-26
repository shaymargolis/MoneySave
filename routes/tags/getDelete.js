
const mongoose = require('mongoose');
const TransactionTag = mongoose.model("TransactionTag");

module.exports = async (req, res) => {
  var body = req.body;

  if (req.tag) {
    transaction.delete();
    res.redirect("/tags/all/?action=deleteTransaction&result=success");
    return;
  }

  res.redirect("/tags/all/?action=deleteTransaction&result=notExist");
};
