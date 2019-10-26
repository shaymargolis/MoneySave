
const mongoose = require('mongoose');

const User = mongoose.model("User");
const TransactionTag = mongoose.model("TransactionTag");

module.exports = async (req, res) => {
  var body = req.body;

  var tag = req.tag;

  if (tag == null) {
    res.status(404).json({err: "not found"});
    return;
  }

  tag.title = body.title;
  tag.color = body.color;

  tag.save();

  res.redirect('/tags/all?action=updateTag&result=success');
};
