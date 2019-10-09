const models = require('express').Router();

models.get('/trans_types/:query', require('./transTypes'))
models.get('/trans_tags/:query', require('./transTags'))

module.exports = models;
