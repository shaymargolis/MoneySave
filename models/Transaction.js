const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  datetime: Date,
  sum: Number,
  _transaction_type: { type: mongoose.Schema.Types.ObjectId, ref: 'TransactionType' },
  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Transaction', transactionSchema);
