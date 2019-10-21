const mongoose = require('mongoose');
const moment = require('moment');
const PeriodicTransaction = mongoose.model("PeriodicTransaction");

const TransactionTypeService = require('./TransactionTypeService');
const TransactionTagService = require('./TransactionTagService');

class PeriodicTransactionService {
  static createTransaction(start_month, end_month, sum, transaction_type) {
    var start_month_date = moment(start_month, "MM/YYYY").startOf("month").toDate();
    var end_month_date = moment(end_month, "MM/YYYY").endOf("month");

    if (end_month_date.isValid()) {
      end_month_date = end_month_date.toDate();
    } else {
      end_month_date = null;
    }

    console.log(start_month + " " + start_month_date);
    console.log(end_month + " " + end_month_date);

    var new_t = new PeriodicTransaction({
      start_month: start_month_date,
      end_month: end_month_date,
      sum: sum,
      _transaction_type: transaction_type
    });

    new_t.save();

    return new_t;
  }

  static async newTransaction(user, is_outcome, start_month, end_month, sum, transaction_type_title, tag) {
      var tag_obj = await TransactionTagService.findTagByTitle(tag);
      var transaction_type = await TransactionTypeService.updateOrCreateByTitle(transaction_type_title, is_outcome, user, tag_obj);

      var trans = this.createTransaction(start_month, end_month, sum, transaction_type);

      return trans;
  }
}

module.exports = PeriodicTransactionService;
