const mongoose = require('mongoose');
const TransactionTag = mongoose.model("TransactionTag");

class TransactionTagService {
  static async findTagByTitle(title, user) {
    return await TransactionTag.findOne({ title: title, _user: user });
  }
}

module.exports = TransactionTagService;
