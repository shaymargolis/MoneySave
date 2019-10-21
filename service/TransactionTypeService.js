const mongoose = require('mongoose');
const TransactionType = mongoose.model("TransactionType");

class TransactionTypeService {
  static async updateOrCreateByTitle(title, user, transaction_tag) {
    var find = await TransactionType.findOne({ title: title, _user: user }).lean(false);

    if (find != null) {
      find._transaction_tag = transaction_tag;
      find.save();
      return find;
    }

    var newType = new TransactionType({
      title: title,
      _user: user,
      _transaction_tag: transaction_tag,
    });

    newType.save();

    return newType;
  }
}

module.exports = TransactionTypeService;
