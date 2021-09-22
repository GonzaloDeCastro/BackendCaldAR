const fs = require('fs');

// Crear una Nuevo Cliente
exports.addNewcliente = async (req, res) => {
  try {
    const { direccion, tipo } = req.body; //data from POSTMAN

    let clienteJSON = fs.readFileSync('datos/clientes.json', 'utf8'); //data from JSON file
    let clientes = JSON.parse(clienteJSON);
    if (!clientes) return res.status(400).json('Json inexistente.'); //error no JSON file

    if (!direccion) {
      return res
        .status(400)
        .send({ error: 'No ingreso direccion de la cliente.' });
    }

    if (!tipo) {
      return res
        .status(400)
        .send({ error: 'No especifico el tipo de cliente.' });
    }

    const clienteId = Number(clientes[clientes.length - 1].id) + 1;
    const newcliente = { id: clienteId, direccion, tipo };
    clientes.push(newcliente);

    fs.writeFileSync('datos/clientes.json', JSON.stringify(clientes), {
      encoding: 'utf8',
      flag: 'w'
    });

    return res.status(200).json(clientes);
  } catch (error) {
    console.error(error); //error
  }
};

// Obtener clientes
exports.getAllclientes = async (req, res) => {
  try {
    let clienteJSON = fs.readFileSync('datos/clientes.json', 'utf8');
    let clientes = JSON.parse(clienteJSON);
    if (!clientes) return res.status(400).json('Json inexistente.');
    return res.status(200).json(clientes);
  } catch (error) {
    console.error(error);
  }
};

// Obtener Cliente por ID
exports.getclienteById = async (req, res) => {
  try {
    const clienteId = req.params.clienteId;
    let clienteJSON = fs.readFileSync('datos/clientes.json', 'utf8');
    let clientes = JSON.parse(clienteJSON);

    let cliente = clientes.filter(
      (cliente) => Number(cliente.id) === Number(clienteId)
    );

    if (cliente.length === 0)
      return res.status(400).json('No se encontro una cliente con ese Id.');

    return res.status(200).json(cliente);
  } catch (error) {
    console.error(error);
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
    const clienteId = req.params.clienteId;

    let clienteJSON = fs.readFileSync('datos/clientes.json', 'utf8');

    let clientes = JSON.parse(clienteJSON);
    if (!clientes) return res.status(400).json('Json Inexistente.');

    let clienteIndex = clientes.findIndex(
      (cliente) => Number(cliente.id) === Number(clienteId)
    );

    if (clienteIndex === -1) {
      return res
        .status(400)
        .send({ error: `No existe el edificio con id: ${clienteId} .` });
    }

    clientes.splice(clienteIndex, 1);

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
