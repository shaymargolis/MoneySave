const mongoose = require('mongoose');

const transactionTagSchema = new mongoose.Schema({
  title: String,
  color: String
}, {
  timestamps: true
});

module.exports = mongoose.model('TransactionTag', transactionTagSchema);
