const fs = require('fs');

const clienteSchema = require('../modelos/modeloClientes');

exports.addNewcliente = async (req, res) => {
  try {
    const cliente = new clienteSchema(req.body);
    const nuevoCliente = await cliente.save();
    //validacion
    const { direccion } = req.body; //data from POSTMAN
    if (!direccion) {
      return res
        .status(400)
        .send({ error: 'No ingreso direccion de la cliente.' });
    }

    return res.status(201).json({
      dato: nuevoCliente,
      error: false
    });
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: error
    });
  }
};

// Obtener clientes
exports.getAllclientes = async (req, res) => {
  try {
    const response = await clienteSchema.find();
    return res.status(200).json({
      data: response,
      error: false
    });
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: error
    });
  }
};

// Obtener Cliente por ID
exports.getclienteById = async (req, res) => {
  try {
    const response = await clienteSchema.findOne({ _id: req.params.clienteId });

    if (!response || response.length === 0) {
      return res.status(404).json({
        error: true,
        message: 'Usuario no encontrado'
      });
    }

    return res.status(200).json({
      data: response,
      error: false
    });
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: error
    });
  }
};

// Obtener Cliente por tipo (A, B, C, o D)
exports.getclienteByTipo = async (req, res) => {
  try {
    const clienteTipo = req.params.clienteTipo;
    let clienteJSON = fs.readFileSync('datos/clientes.json', 'utf8');
    let clientes = JSON.parse(clienteJSON);

    let cliente = clientes.filter((cliente) => cliente.tipo === clienteTipo);

    if (cliente.length === 0)
      return res
        .status(400)
        .json(`No se encontraron clientes del tipo ${clienteTipo}`);

    return res.status(200).json(cliente);
  } catch (error) {
    console.error(error);
    return res.status(500).json('Internal server error.');
  }
};

// UPDATE Or MODIFY A cliente By ID
exports.updatecliente = async (req, res) => {
  try {
    const { id, direccion, tipo } = req.body;

    let clienteJSON = fs.readFileSync('datos/clientes.json', 'utf8');

    let clientes = JSON.parse(clienteJSON);
    if (!clientes) return res.status(400).json('Json Inexistente.');

    let clienteIndex = clientes.findIndex(
      (cliente) => Number(cliente.id) === Number(id)
    );

    if (clienteIndex === -1) {
      return res
        .status(400)
        .send({ error: `No existe la cliente con id: ${clienteId} .` });
    }

    if (!direccion) {
      return res
        .status(400)
        .send({ error: 'No ingreso descripcion de la cliente.' });
    }

    if (!tipo) {
      return res
        .status(400)
        .send({ error: 'No especifico el tipo de cliente.' });
    }

    const updatedcliente = {
      id: Number(id),
      direccion,
      tipo
    };

    clientes[clienteIndex] = updatedcliente;

    fs.writeFileSync('datos/clientes.json', JSON.stringify(clientes), {
      encoding: 'utf8',
      flag: 'w'
    });

    return res.status(200).json(clientes);
  } catch (error) {
    console.error(error);
    return res.status(500).json('Internal server error.');
  }
};

// DELETE A cliente By ID

exports.deletecliente = async (req, res) => {
  try {
    const response = await clienteSchema.findOneAndRemove({
      _id: req.params.clienteId
    });

    if (!response || response.length === 0) {
      return res.status(404).json({
        error: true,
        message: 'Usuario no encontrado para eliminar'
      });
    }
    return res.status(202).json({
      data: response,
      error: false
    });
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: error
    });
  }
};
