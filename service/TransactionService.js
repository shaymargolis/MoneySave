const mongoose = require('mongoose');
const Transaction = mongoose.model("Transaction");

const TransactionTypeService = require('./TransactionTypeService');
const TransactionTagService = require('./TransactionTagService');

class TransactionService {
  static createTransaction(is_outcome, datetime, sum, transaction_type) {
    var new_t = new Transaction({
      is_outcome: is_outcome,
      datetime: datetime,
      sum: sum,
      _transaction_type: transaction_type
    });

    new_t.save();

    return new_t;
  }

  static async newTransaction(user, is_outcome, datetime, sum, transaction_type_title, tag) {
      var tag_obj = await TransactionTagService.findTagByTitle(tag);
      var transaction_type = await TransactionTypeService.updateOrCreateByTitle(transaction_type_title, user, tag_obj);

      var trans = this.createTransaction(is_outcome, datetime, sum, transaction_type);

      return trans;
  }
}

module.exports = TransactionService;
