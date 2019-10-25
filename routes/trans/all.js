
const mongoose = require('mongoose');
const Transaction = mongoose.model("Transaction");

module.exports = async (req, res) => {
  var all = await Transaction.find().populate({
      path: "_transaction_type",
      populate: {
        path: "_transaction_tag",
      }
    }).sort({"datetime": -1});

  res.render("trans/all", {
    page: "transactions",
    trans_list: all,
    action: req.query.action,
    result: req.query.result,
    moment: require('moment')
  })
};
