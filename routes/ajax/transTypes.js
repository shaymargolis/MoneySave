
const mongoose = require('mongoose');
const TransactionType = mongoose.model("TransactionType");

module.exports = async (req, res) => {
  var query = req.params.query;

  var result = await TransactionType.find({title: { $regex: '.*' + query + '.*' }});

  res.status(200).json(result);
};
