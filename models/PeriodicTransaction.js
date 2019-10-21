const mongoose = require('mongoose');

const periodicTransactionSchema = new mongoose.Schema({
  period: String,
  sum: Number,
  _transaction_type: { type: mongoose.Schema.Types.ObjectId, ref: 'TransactionType' },
}, {
  timestamps: true
});

module.exports = mongoose.model('PeriodicTransaction', periodicTransactionSchema);
