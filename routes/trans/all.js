
const mongoose = require('mongoose');
const Transaction = mongoose.model("Transaction");

module.exports = async (req, res) => {
  Transaction.find().populate({
      path: "_transaction_type",
      populate: {
        path: "_transaction_tag",
      }
    }).exec(function(err, all) {
    res.render("trans/all", { trans_list: all, action: req.query.action, result: req.query.result })
  });

};
