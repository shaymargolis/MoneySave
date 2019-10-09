const mongoose = require('mongoose');

const transactionTypeSchema = new mongoose.Schema({
  title: String,
  _transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }]
}, {
  timestamps: true
});

module.exports = mongoose.model('TransactionType', transactionTypeSchema);
