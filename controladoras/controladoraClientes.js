const clientes = require('../datos/clientes.json');

const getAllclientes = (req,res) =>{
    res.json(clientes);
}

const getclientesById = (req,res) =>{
    const found = clientes.some(Clientes => Clientes.id === parseInt(req.params.param));
    if (found) {
        res.json(clientes.filter(Clientes => Clientes.id === parseInt(req.params.param)));
    }
    else{
        res.status(404).json({ msg: `No se encontraron Clientes con el id de ${req.params.param}`});
    }
}


const getclientesByRazonSocial= (req,res) =>{
    const found = clientes.some(Clientes =>Clientes.razon_social === req.params.param);
    if (found) {
        res.json(clientes.filter(Clientes => Clientes.razon_social === req.params.param));
    }
    else{
        res.status(404).json({ msg: `No hay Clientes con la razón social ${req.params.param}`});
    }
}

//Borrar Cliente
const deleteClientes = (req,res) =>{
    const found = clientes.some(Clientes => Clientes.id === parseInt(req.params.id));
    if (found) {
        res.json({ msg: 'Cliente deleted', clientes: clientes.filter(Clientes => Clientes.id !== parseInt(req.params.id))});
    }

    else{
        res.status(400).json({ msg: `No se encontraron Clientes con el id de ${req.params.id}`});
    }
}

// Actualizar Cliente
const putClientes = (req,res) =>{
    const found = clientes.some(idFilter(req));
    if (found) {
        clientes.forEach((cliente, i) => {
        if (idFilter(req)(cliente)) {
    
            const updcliente = {...cliente, ...req.body};
            clientes[i] = updcliente
            res.json({ msg: 'cliente updated', updcliente });
            }
        });
        } else {
        res.status(400).json({ msg: `No cliente with the id of ${req.params.id}` });
        }
}


module.exports ={
    getAllclientes,
    getclientesById,
    getclientesByRazonSocial,
    deleteClientes,
    putClientes
}