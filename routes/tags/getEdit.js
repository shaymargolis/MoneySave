
const mongoose = require('mongoose');
const TransactionTag = mongoose.model("TransactionTag");

module.exports = async (req, res) => {
  var body = req.body;

  res.render("tags/create", {
    edit: true,
    action_url: "/tags/"+req.tag._id+"/edit",
    data: tag
  });
};
