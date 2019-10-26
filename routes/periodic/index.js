const models = require('express').Router();
const auth = require("../auth_middleware");
const auth_periodic = require("./auth_periodic");

// Global operations
models.get('/all', auth, require('./all'));
models.get('/create', auth, require('./getCreate'))
models.post('/create', auth, require('./postCreate'))

// Private operations
models.get('/:id/delete', auth, auth_periodic, require('./getDelete'))
models.get('/:id/edit', auth, auth_periodic, require('./getEdit'))
models.post('/:id/edit', auth, auth_periodic, require('./postEdit'))

module.exports = models;
