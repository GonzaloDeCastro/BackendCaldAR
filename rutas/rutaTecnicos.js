const express = require('express');
const router = express.Router();
const tecnicoController = require('../controladoras/controladoraTecnicos');

module.exports = () => {
    router.post('/', tecnicoController.addNewTecnico);
  
    router.get('/all', tecnicoController.getAlltecnicos);
    router.get('/tipo/:tecnicoTipo', tecnicoController.getTecnicoByTipo);
    router.get('/:tecnicoId', tecnicoController.getTecnicoById);

    router.put('/', tecnicoController.updateTecnico);

    router.delete('/:tecnicoId', tecnicoController.deleteTecnico);
    return router;
}


