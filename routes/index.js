const routes = require('express').Router();
const auth = require("./auth_middleware");
const bcrypt = require("bcrypt");

// Create "/" paths
routes.get("/", auth, function(req, res) {
  res.redirect("/summary");
})

// Debug generates password
routes.get('/generate', function (req, res) {
  const saltRounds = 10;
  bcrypt.hash("o0p00o0p", saltRounds, function (err, hash) {
    res.send(hash);
    res.status(200);
  });
});

// Summary route
routes.get('/summary', auth, require('./summary'))

module.exports = routes;

// Add another paths
routes.use('/user', require('./user'));
routes.use('/trans', require('./trans'));
routes.use('/periodic', require('./periodic'));
routes.use('/tags', require('./tags'));
routes.use('/ajax', require('./ajax'));
