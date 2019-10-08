const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  _transaction_type: { type: mongoose.Schema.Types.ObjectId, ref: 'TransactionType' },
  is_income: Boolean,
  datetime: Date,
  sum: Number
}, {
  timestamps: true
});

module.exports = mongoose.model('Transaction', transactionSchema);
