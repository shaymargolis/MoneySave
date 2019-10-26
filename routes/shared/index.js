const models = require('express').Router();
const auth = require("../auth_middleware");

// Global operations
models.get('/', auth, require('./main'));

module.exports = models;
