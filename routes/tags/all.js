
const mongoose = require('mongoose');
const TransactionTag = mongoose.model("TransactionTag");

module.exports = async (req, res) => {
  TransactionTag.find().exec(function(err, all) {
    res.render("tags/all", { tag_list: all, action: req.query.action, result: req.query.result })
  });
};
