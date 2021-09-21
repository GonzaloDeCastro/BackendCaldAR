const express = require('express');
const router = express.Router();
const mantenimientoController = require('../controladoras/controladoraMantenimientos');


module.exports = () => {
    router.post('/', mantenimientoController.addNewMantenimiento);
  
    router.get('/all', mantenimientoController.getAllMantenimientos);
    router.get('/tipo/:mantenimientoTipo', mantenimientoController.getMantenimientoByTipo);
    router.get('/:mantenimientoId', mantenimientoController.getMantenimientoById);

    router.put('/', mantenimientoController.updateMantenimiento);

    router.delete('/:mantenimientoId', mantenimientoController.deleteMantenimiento);
    return router;
}