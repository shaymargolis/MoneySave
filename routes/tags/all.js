
const mongoose = require('mongoose');
const TransactionTag = mongoose.model("TransactionTag");
const User = mongoose.model("User");

module.exports = async (req, res) => {

  TransactionTag.find({
    _user: req.user
  }).exec(function(err, all) {
    res.render("tags/all", {
      page: "tags",
      tag_list: all,
      action: req.query.action,
      result: req.query.result
    })
  });
};
