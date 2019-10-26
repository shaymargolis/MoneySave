const mongoose = require('mongoose');
const Transaction = mongoose.model("Transaction");

const auth = async (req,res,next) => {
  var trans = await Transaction.findOne({ _id: req.params.id }).populate("_user");

  if (!trans) {
    next();
    return;
  }

  if (!trans._user || !trans._user._id.equals(req.user._id)) {
    res.status(401).send("Not your transaction");
    return;
  }

  req.trans = trans;

  next();
}

module.exports = auth
