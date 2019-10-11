const routes = require('express').Router();

// Create "/" paths
routes.get('/', function (req, res) {
  res.redirect('/summary');
});

routes.get('/summary', require('./summary'))

module.exports = routes;

// Add another paths
routes.use('/trans', require('./trans'));
routes.use('/periodic', require('./periodic'));
routes.use('/tags', require('./tags'));
routes.use('/ajax', require('./ajax'));
