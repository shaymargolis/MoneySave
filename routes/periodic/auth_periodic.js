const mongoose = require('mongoose');
const PeriodicTransaction = mongoose.model("PeriodicTransaction");

const auth = async (req,res,next) => {
  var periodic = await PeriodicTransaction.findOne({ _id: req.params.id });

  if (!periodic) {
    next();
    return;
  }

  if (periodic._user._id !== res.user._id) {
    res.status(401).send("Not your periodicTransaction");
    return;
  }

  res.periodic = periodic;

  next();
}

module.exports = auth
