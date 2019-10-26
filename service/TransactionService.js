const mongoose = require('mongoose');
const Transaction = mongoose.model("Transaction");

const TransactionTypeService = require('./TransactionTypeService');
const TransactionTagService = require('./TransactionTagService');

class TransactionService {
  static async newTransaction(user, is_outcome, datetime, sum, transaction_type_title, tag) {
      var tag_obj = await TransactionTagService.findTagByTitle(tag, user);
      var transaction_type = await TransactionTypeService.updateOrCreateByTitle(transaction_type_title, is_outcome, user, tag_obj);

      var new_t = new Transaction({
        datetime: datetime,
        sum: sum,
        _user: user,
        _transaction_type: transaction_type
      });

      new_t.save();

      return new_t;
  }

  static async updateTransaction(trans, user, is_outcome, datetime, sum, transaction_type_title, tag) {
      var tag_obj = await TransactionTagService.findTagByTitle(tag, user);
      var transaction_type = await TransactionTypeService.updateOrCreateByTitle(transaction_type_title, is_outcome, user, tag_obj);

      trans.datetime = datetime,
      trans.sum = sum;
      trans._transaction_type = transaction_type;
      trans.save();

      return trans;
  }
}

module.exports = TransactionService;
