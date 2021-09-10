const express = require('express');
const router = express.Router();
const clientesControladora = require('../controladoras/controladoraClientes');

router.get('/clientes', clientesControladora.getAllclientes);
router.get('/clientes/:param',(req,res) =>{
    if (req.params.param.match(/^[0-9]*$/)) {
        clientesControladora.getclientesById(req,res);
    }
    else{
        clientesControladora.getclientesByRazonSocial(req,res);
    }

});

router.delete('/clientes/:id', clientesControladora.deleteClientes);
module.exports = router;