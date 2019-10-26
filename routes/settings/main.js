
const mongoose = require('mongoose');

module.exports = async (req, res) => {
  res.render("settings/main", {
    page: "settings",
    data: {
      user: req.user
    }
  })
};
