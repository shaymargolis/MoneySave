const mongoose = require('mongoose');
const Transaction = mongoose.model("Transaction");

const auth = async (req,res,next) => {
  var trans = await Transaction.findOne({ _id: req.params.id });

  if (!trans) {
    next();
    return;
  }

  console.log(trans._user._id);
  console.log(req.user._id);

  if (trans._user._id !== req.user._id) {
    res.status(401).send("Not your transaction");
    return;
  }

  res.trans = trans;

  next();
}

module.exports = auth
