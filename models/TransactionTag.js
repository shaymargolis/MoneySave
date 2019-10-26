const mongoose = require('mongoose');

const transactionTagSchema = new mongoose.Schema({
  title: String,
  color: String,
  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

module.exports = mongoose.model('TransactionTag', transactionTagSchema);
