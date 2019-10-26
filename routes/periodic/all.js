
const mongoose = require('mongoose');
const PeriodicTransaction = mongoose.model("PeriodicTransaction");

module.exports = async (req, res) => {
  var periodic_list = PeriodicTransaction.find({
    _user: req.user
  }).populate({
      path: "_transaction_type",
      populate: {
        path: "_transaction_tag",
      }
    }).exec(function(err, all) {
    res.render("periodic/all", {
      page: "periodic",
      periodic_list: all,
      action: req.query.action,
      result: req.query.result,
      moment: require('moment')
    })
  });

};
