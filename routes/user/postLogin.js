const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = async (req, res) => {
  var user = await User.findOne({
    username: req.body.username
  });

  if (!user) {
    res.redirect("/user/login?action=login&message=badLogin");
    return;
  }

  bcrypt.compare(req.body.password, user.password, function (err, result) {
    if (result) {
      req.session.isLoggedIn = true;
      req.session.userId = user._id;

      res.redirect('/summary');
    } else {
      res.redirect("/user/login?action=login&message=badLogin");
    }
  });
};
