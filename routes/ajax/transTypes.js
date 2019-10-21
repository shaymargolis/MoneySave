
const mongoose = require('mongoose');
const TransactionType = mongoose.model("TransactionType");

module.exports = async (req, res) => {
  var query = req.params.query;

  var result = await TransactionType.find({title: { $regex: '.*' + query + '.*' }}).populate("_transaction_tag");

  res.status(200).json(result);
};
