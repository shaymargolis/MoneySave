
const mongoose = require('mongoose');
const TransactionTag = mongoose.model("TransactionTag");
const User = mongoose.model("User");

module.exports = async (req, res) => {
  var user = await User.findOne({ _id: "5d9c6f8640c69501a866cf07" });

  TransactionTag.find({
    _user: user
  }).exec(function(err, all) {
    res.render("tags/all", {
      page: "tags",
      tag_list: all,
      action: req.query.action,
      result: req.query.result
    })
  });
};
