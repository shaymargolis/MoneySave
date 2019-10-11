
const mongoose = require('mongoose');
const PeriodicTransaction = mongoose.model("PeriodicTransaction");

module.exports = async (req, res) => {
  var body = req.body;

  var transaction = await PeriodicTransaction.findOne({ _id: req.params.id });

  if (transaction) {
    transaction.delete();
    res.redirect("/periodic/all/?action=deleteTransaction&result=success");
    return;
  }

  res.redirect("/periodic/all/?action=deleteTransaction&result=notExist");
};
