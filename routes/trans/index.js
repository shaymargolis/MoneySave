const models = require('express').Router();
const auth = require("../auth_middleware");
const auth_trans = require("./auth_trans");

models.get('/all', auth, require('./all'));
models.get('/create', auth, require('./getCreate'))
models.post('/create', auth, require('./postCreate'))


models.get('/:id/delete', auth, auth_trans, require('./getDelete'))
models.get('/:id/edit', auth, auth_trans, require('./getEdit'))
models.post('/:id/edit', auth, auth_trans, require('./postEdit'))

module.exports = models;
