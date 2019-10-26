const mongoose = require('mongoose');
const TransactionTag = mongoose.model("TransactionTag");

const auth = async (req,res,next) => {
  var tag = await TransactionTag.findOne({ _id: req.params.id }).populate("_user");

  if (!tag) {
    next();
    return;
  }

  if (!tag._user._id.equals(req.user._id)) {
    res.status(401).send("Not your tag");
    return;
  }

  req.tag = tag;

  next();
}

module.exports = auth
