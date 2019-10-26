
const mongoose = require('mongoose');

const User = mongoose.model("User");
const TransactionTag = mongoose.model("TransactionTag");

module.exports = async (req, res) => {
  var body = req.body;

  var user = await User.findOne({ _id: "5d9c6f8640c69501a866cf07" });
  var tag = await TransactionTag.findOne({ _id: req.params.id, _user: user });

  if (tag == null) {
    res.status(404).json({err: "not found"});
    return;
  }

  tag.title = body.title;
  tag.color = body.color;

  tag.save();

  res.redirect('/tags/all?action=updateTag&result=success');
};
