const mongoose = require('mongoose');

const transactionTagSchema = new mongoose.Schema({
  title: String,
  _transaction_types: [{type: mongoose.Schema.Types.ObjectId, ref: 'TransactionType'}],
  color: {
    type: String,
    enum: ["Blue", "Black", "Green", "Orange", "Yellow", "Brown", "Purple", "Pink"]
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('TransactionTag', transactionTagSchema);
