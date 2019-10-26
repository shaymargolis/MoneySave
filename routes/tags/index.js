const models = require('express').Router();
const auth = require("../auth_middleware");
const auth_tag = require("./auth_tag");

// Global operations
models.get('/all', auth, require('./all'));
models.get('/create', auth, require('./getCreate'))
models.post('/create', auth, require('./postCreate'))

// Private operations
models.get('/:id/delete', auth, auth_tag, require('./getDelete'))
models.get("/:id/edit", auth, auth_tag, require("./getEdit"))
models.post("/:id/edit", auth, auth_tag, require("./postEdit"))

module.exports = models;
