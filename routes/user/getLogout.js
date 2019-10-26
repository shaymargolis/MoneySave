
module.exports = (req, res) => {
  req.session.isLoggedIn = false;
  req.session.userId = null;

  res.redirect("/user/login");
};
