const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  monthStart: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
