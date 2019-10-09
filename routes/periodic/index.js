const models = require('express').Router();

models.get('/all', require('./all'));
models.get('/create', require('./getCreate'))
models.post('/create', require('./postCreate'))

module.exports = models;
