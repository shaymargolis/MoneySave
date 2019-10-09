
const mongoose = require('mongoose');
const User = mongoose.model("User");

module.exports = (req, res) => {
  /*const user = new User({
    username: "shaym",
    password: "abc"
  });
  user.save()*/

  res.render("summary")
};
