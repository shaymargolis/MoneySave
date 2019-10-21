
const mongoose = require('mongoose');

const Transaction = mongoose.model("Transaction");
const TransactionTag = mongoose.model("TransactionTag");

module.exports = async (req, res) => {
  var tags = await TransactionTag.find();
  var sum_tags = [];

  for (let tag of tags) {
    var transactions = await Transaction.find().populate({
      path: "_transaction_type",
      match: {
        '_transaction_tag.title': tag
      }
    });


  }

  res.render("summary", {spending_circle: {
    labels: ["אוכל", "נותר"],
    colors: ["blue", "gray"],
    data: [50, 50]
  }
  })
};
