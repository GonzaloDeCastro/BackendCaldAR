const express = require('express');
const router = express.Router();
const clienteController = require('../controladoras/controladoraClientes');

module.exports = () => {
  router.post('/', clienteController.addNewcliente);
  
  router.get('/all', clienteController.getAllclientes);
  router.get('/tipo/:clienteTipo', clienteController.getclienteByTipo);
  router.get('/:clienteId', clienteController.getclienteById);

  router.put('/', clienteController.updatecliente);

  router.delete('/:clienteId', clienteController.deletecliente);
  return router;
};
