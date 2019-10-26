const mongoose = require('mongoose');
const User = mongoose.model("User");

const auth = async (req,res,next) => {
  if (req.session.isLoggedIn) {
    const user = await User.findOne({ _id: req.session.userId });

    if (!user) {
      req.session.isLoggedIn = false;
      req.session.userId = null;

      res.redirect("/user/login");
    }

    req.user = user;
    next();
  } else {
    res.redirect("/user/login");
  }
}

module.exports = auth
