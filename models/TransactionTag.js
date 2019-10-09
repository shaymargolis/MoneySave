const mongoose = require('mongoose');

const transactionTagSchema = new mongoose.Schema({
  title: String,
  color: {
    type: String,
    enum: ["Blue", "Black", "Green", "Orange", "Yellow", "Brown", "Purple", "Pink"]
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('TransactionTag', transactionTagSchema);
