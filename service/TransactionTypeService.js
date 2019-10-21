const mongoose = require('mongoose');
const TransactionType = mongoose.model("TransactionType");

class TransactionTypeService {
  static async updateOrCreateByTitle(title, is_outcome, user, transaction_tag) {
    var find = await TransactionType.findOne({ title: title, _user: user }).lean(false);

    if (find != null) {
      find._transaction_tag = transaction_tag;
      find.is_outcome = is_outcome;
      find.save();
      return find;
    }

    var newType = new TransactionType({
      title: title,
      is_outcome: is_outcome,
      _user: user,
      _transaction_tag: transaction_tag,
    });

    newType.save();

    return newType;
  }
}

module.exports = TransactionTypeService;
