const models = require('express').Router();

models.get('/all', require('./all'));
models.get('/create', require('./getCreate'))
models.post('/create', require('./postCreate'))
models.get('/:id/delete', require('./getDelete'))

module.exports = models;
