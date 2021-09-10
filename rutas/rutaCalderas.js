const express = require('express');
const router = express.Router();
const calderaController = require('../controladoras/controladoraCalderas');

module.exports = () => {
  router.post('/', calderaController.addNewcaldera);
  
  router.get('/all', calderaController.getAllcalderas);
  router.get('/tipo/:calderaTipo', calderaController.getcalderaByTipo);
  router.get('/:calderaId', calderaController.getcalderaById);

  router.put('/', calderaController.updatecaldera);

  router.delete('/:calderaId', calderaController.deletecaldera);
  return router;
};
