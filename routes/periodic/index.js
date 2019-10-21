const models = require('express').Router();

// Global operations
models.get('/all', require('./all'));
models.get('/create', require('./getCreate'))
models.post('/create', require('./postCreate'))

// Private operations
models.get('/:id/delete', require('./getDelete'))
models.get('/:id/edit', require('./getEdit'))

module.exports = models;
