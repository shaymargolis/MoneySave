const routes = require('express').Router();

// Create "/" paths
const home = require('./home');

routes.get('/', home);

module.exports = routes;

// Add another paths
const trans = require('./trans');

routes.use('/trans', trans);
