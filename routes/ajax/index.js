const models = require('express').Router();
const auth = require("../auth_middleware");

models.get('/trans_types/:query', auth, require('./transTypes'))
models.get('/trans_tags/:query', auth, require('./transTags'))

module.exports = models;
