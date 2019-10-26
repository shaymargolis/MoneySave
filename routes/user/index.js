const models = require('express').Router();
const auth = require("../auth_middleware");

// Global operations
models.get('/login', require('./getLogin'));
models.post('/login', require('./postLogin'));
models.get('/logout', auth, require('./getLogout'));

module.exports = models;
