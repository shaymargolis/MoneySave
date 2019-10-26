
const mongoose = require('mongoose');
const Transaction = mongoose.model("Transaction");

module.exports = async (req, res) => {
  var body = req.body;

  var transaction = req.trans;

  if (transaction) {
    transaction.delete();
    res.redirect("/trans/all/?action=deleteTransaction&result=success");
    return;
  }

  res.redirect("/trans/all/?action=deleteTransaction&result=notExist");
};
