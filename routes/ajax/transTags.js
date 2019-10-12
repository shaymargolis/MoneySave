
const mongoose = require('mongoose');
const TransactionTag = mongoose.model("TransactionTag");


module.exports = async (req, res) => {
  var query = req.params.query;

  var result = await TransactionTag.find({title: { $regex: '.*' + query + '.*' }});

  res.status(200).json(result);
};
