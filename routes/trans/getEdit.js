
const mongoose = require('mongoose');
const Transaction = mongoose.model("Transaction");

module.exports = async (req, res) => {
  var body = req.body;

  var transaction = await Transaction.findOne({ _id: req.params.id }).populate({
    path: "_transaction_type",
    populate: {
      path: "_transaction_tag",
    }
  });

  res.render("trans/create", {
    edit: true,
    data: transaction,
    moment: require('moment'),
    action_url: "/trans/"+transaction._id+"/edit"
  });
};