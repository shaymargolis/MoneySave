const mongoose = require('mongoose');

const periodicTransactionSchema = new mongoose.Schema({
  sum: Number,
  start_month: Date,
  end_month: Date,
  _transaction_type: { type: mongoose.Schema.Types.ObjectId, ref: 'TransactionType' },
  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

module.exports = mongoose.model('PeriodicTransaction', periodicTransactionSchema);
