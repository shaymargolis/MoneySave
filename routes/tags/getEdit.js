
const mongoose = require('mongoose');
const TransactionTag = mongoose.model("TransactionTag");

module.exports = async (req, res) => {
  var body = req.body;

  if (!req.tag) {
    res.status(404).send("Not found");
    return;
  }

  res.render("tags/create", {
    edit: true,
    action_url: "/tags/"+req.tag._id+"/edit",
    data: req.tag
  });
};
