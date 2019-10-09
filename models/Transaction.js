const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  is_outcome: Boolean,
  datetime: Date,
  sum: Number,
  _transaction_type: { type: mongoose.Schema.Types.ObjectId, ref: 'TransactionType' },
}, {
  timestamps: true
});

module.exports = mongoose.model('Transaction', transactionSchema);
