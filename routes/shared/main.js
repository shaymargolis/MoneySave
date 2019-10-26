
const mongoose = require('mongoose');

module.exports = async (req, res) => {
  res.render("shared/main", {
    page: "shared",
    data: {
      user: req.user
    }
  })
};
