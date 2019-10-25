
const mongoose = require('mongoose');
const TransactionTag = mongoose.model("TransactionTag");

module.exports = async (req, res) => {
  var body = req.body;

  var tag = await TransactionTag.findOne({ _id: req.params.id });

  res.render("tags/create", {
    edit: true,
    action_url: "/tags/"+req.params.id+"/edit",
    data: tag
  });
};
