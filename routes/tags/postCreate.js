
const mongoose = require('mongoose');
const TransactionTag = mongoose.model("TransactionTag");
const User = mongoose.model("User");

function createTransactionTag(title, color, user) {
  // Create the type
  var tag = new TransactionTag({
    title: title,
    color: color,
    _user: user
  });

  return tag;
}

module.exports = async (req, res) => {
  var body = req.body;

  var user = await User.findOne({ _id: "5d9c6f8640c69501a866cf07" });
  var tag = createTransactionTag(body.title, body.color, user);
  tag.save();

  res.redirect("/tags/all")
};
