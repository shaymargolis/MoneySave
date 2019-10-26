const mongoose = require('mongoose');
const moment = require('moment');
const PeriodicTransaction = mongoose.model("PeriodicTransaction");

const TransactionTypeService = require('./TransactionTypeService');
const TransactionTagService = require('./TransactionTagService');

class PeriodicTransactionService {
  static getDates(start_month, end_month) {
    var start_month_date = moment(start_month, "MM/YYYY").startOf("month").toDate();
    var end_month_date = moment(end_month, "MM/YYYY").endOf("month");

    if (end_month_date.isValid()) {
      end_month_date = end_month_date.toDate();
    } else {
      end_month_date = null;
    }

    return {
      start_month_date: start_month_date,
      end_month_date: end_month_date
    }
  }

  static createTransaction(user, start_month, end_month, sum, transaction_type) {
    var dates = this.getDates(start_month, end_month);

    var new_t = new PeriodicTransaction({
      start_month: dates.start_month_date,
      end_month: dates.end_month_date,
      sum: sum,
      _transaction_type: transaction_type,
      _user: user,
    });

    new_t.save();

    return new_t;
  }

  static async newTransaction(user, is_outcome, start_month, end_month, sum, transaction_type_title, tag) {
      var tag_obj = await TransactionTagService.findTagByTitle(tag, user);
      var transaction_type = await TransactionTypeService.updateOrCreateByTitle(transaction_type_title, is_outcome, user, tag_obj);

      var trans = this.createTransaction(user, start_month, end_month, sum, transaction_type);

      return trans;
  }

  static updateTransaction(trans, is_outcome, start_month, end_month, sum, transaction_type_title, tag) {
      var dates = this.getDates(start_month, end_month);

      transaction.start_month = start_month_date;
      transaction.end_month = end_month_date;
      transaction.sum = sum;
      transaction._transaction_type = transaction_type;

      transaction.save();
  }

  static async updateTransaction(transaction, user, is_outcome, start_month, end_month, sum, transaction_type_title, tag) {
      var tag_obj = await TransactionTagService.findTagByTitle(tag, user);
      var transaction_type = await TransactionTypeService.updateOrCreateByTitle(transaction_type_title, is_outcome, user, tag_obj);

      this.updateTransaction(transaction, start_month, end_month, sum, transaction_type)

      return transaction;
  }
}

module.exports = PeriodicTransactionService;
