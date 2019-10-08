const mongoose = require('mongoose');

const transactionTypeSchema = new mongoose.Schema({
  title: String,
  _tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'TransactionTag'}],
  _transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }]
}, {
  timestamps: true
});

module.exports = mongoose.model('TransactionType', transactionTypeSchema);
