const routes = require('express').Router();

// Create "/" paths
routes.get('/', require('./home'));

module.exports = routes;

// Add another paths
routes.use('/trans', require('./trans'));
routes.use('/ajax', require('./ajax'));
