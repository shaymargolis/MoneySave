
const mongoose = require('mongoose');
const TransactionTag = mongoose.model("TransactionTag");

function createTransactionTag(title, color) {
  // Create the type
  var tag = new TransactionTag({
    title: title,
    color: color
  });

  return tag;
}

module.exports = (req, res) => {
  var body = req.body;

  var tag = createTransactionTag(body.title, body.color);
  tag.save();

  res.redirect("/tags/all")
};
