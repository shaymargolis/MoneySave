
const mongoose = require('mongoose');
const PeriodicTransaction = mongoose.model("PeriodicTransaction");

module.exports = async (req, res) => {
  var body = req.body;

  var transaction = await PeriodicTransaction.findOne({ _id: req.params.id }).populate({
    path: "_transaction_type",
    populate: {
      path: "_transaction_tag",
    }
  });

  res.render("periodic/create", {
    edit: true,
    data: transaction,
    moment: require('moment'),
    action_url: "/periodic/"+transaction._id+"/edit"
  });
};
