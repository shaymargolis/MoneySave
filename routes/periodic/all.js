
const mongoose = require('mongoose');
const PeriodicTransaction = mongoose.model("PeriodicTransaction");

module.exports = async (req, res) => {
  var periodic_list = PeriodicTransaction.find({}, function(err, all) {
    res.render("periodic/all", { periodic_list: all })
  });

};
