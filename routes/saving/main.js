
const mongoose = require('mongoose');

module.exports = async (req, res) => {
  res.render("saving/main", {
    page: "saving",
    data: {
      user: req.user
    }
  })
};
