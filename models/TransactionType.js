const mongoose = require('mongoose');

const transactionTypeSchema = new mongoose.Schema({
  title: String,
  is_outcome: Boolean,
  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  _transaction_tag: { type: mongoose.Schema.Types.ObjectId, ref: 'TransactionTag' },
  _transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
  _periodic_transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PeriodicTransaction' }]
}, {
  timestamps: true
});

module.exports = mongoose.model('TransactionType', transactionTypeSchema);
