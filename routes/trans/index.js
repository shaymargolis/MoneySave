const models = require('express').Router();
const auth = require("../auth_middleware");

models.get('/all', auth, require('./all'));
models.get('/create', auth, require('./getCreate'))
models.post('/create', auth, require('./postCreate'))
models.get('/:id/delete', auth, require('./getDelete'))
models.get('/:id/edit', auth, require('./getEdit'))
models.post('/:id/edit', auth, require('./postEdit'))

module.exports = models;
