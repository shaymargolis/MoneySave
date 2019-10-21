const mongoose = require('mongoose');
const PeriodicTransaction = mongoose.model("PeriodicTransaction");

const TransactionTypeService = require('./TransactionTypeService');
const TransactionTagService = require('./TransactionTagService');

class PeriodicTransactionService {
  static createTransaction(period, sum, transaction_type) {
    var new_t = new PeriodicTransaction({
      period: period,
      sum: sum,
      _transaction_type: transaction_type
    });

    new_t.save();

    return new_t;
  }

  static async newTransaction(user, is_outcome, period, sum, transaction_type_title, tag) {
      var tag_obj = await TransactionTagService.findTagByTitle(tag);
      var transaction_type = await TransactionTypeService.updateOrCreateByTitle(transaction_type_title, is_outcome, user, tag_obj);

      var trans = this.createTransaction(period, sum, transaction_type);

      return trans;
  }
}

module.exports = PeriodicTransactionService;
