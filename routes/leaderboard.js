
const express = require('express');
const roleRouter = express.Router();
const controller = require('../controllers/game');
roleRouter.get('/', controller.index);
roleRouter.get('/form', controller.form);
roleRouter.post('/store', controller.store);
roleRouter.post('/view/{id}', controller.view);
roleRouter.put('/update/{id}', controller.update);
roleRouter.delete('/delete/{id}', controller.delete);
module.exports = roleRouter;