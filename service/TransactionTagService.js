const mongoose = require('mongoose');
const TransactionTag = mongoose.model("TransactionTag");

class TransactionTagService {
  static async findTagByTitle(title) {
    return await TransactionTag.findOne({ title: title });
  }
}

module.exports = TransactionTagService;
