const fs = require('fs');

// Crear un Nuevo Mantenimiento
exports.addNewMantenimiento = async (req, res) => {
  try {
    const { tecnico, cliente, fecha, caldera, tipo_mantenimiento } = req.body; //data from POSTMAN

    let mantenimientoJSON = fs.readFileSync(
      'datos/mantenimientos.json',
      'utf8'
    ); //data from JSON file
    let mantenimientos = JSON.parse(mantenimientoJSON);

    if (!mantenimientos) return res.status(400).json('Json inexistente.'); //error no JSON file

    if (!tecnico) {
      return res
        .status(400)
        .send({ error: 'No ingreso el nombre del Técnico responsable.' });
    }
    if (!cliente) {
      return res.status(400).send({ error: 'No ingreso el dni del Cliente.' });
    }
    if (!fecha) {
      return res
        .status(400)
        .send({ error: 'No ingreso la Fecha del Mantenimiento.' });
    }
    if (!caldera) {
      return res
        .status(400)
        .send({ error: 'No selecciono el tipo de Caldera.' });
    }
    if (!tipo_mantenimiento) {
      return res
        .status(400)
        .send({ error: 'No selecciono el tipo de Mantenimiento.' });
    }

    const mantenimientoId =
      Number(mantenimientos[mantenimientos.length - 1].id) + 1;
    const newMantenimiento = {
      id: mantenimientoId,
      tecnico,
      cliente,
      fecha,
      caldera,
      tipo_mantenimiento
    };
    mantenimientos.push(newMantenimiento);

    fs.writeFileSync(
      'datos/mantenimientos.json',
      JSON.stringify(mantenimientos),
      {
        encoding: 'utf8',
        flag: 'w'
      }
    );

    return res.status(200).json(mantenimientos);
  } catch (error) {
    console.error(error);
    return res.status(404).json('Error Interno del Servidor.');
  }
};

// GET All Mantenimientos
exports.getAllMantenimientos = async (req, res) => {
  try {
    let mantenimientoJSON = fs.readFileSync(
      'datos/mantenimientos.json',
      'utf8'
    );
    let mantenimientos = JSON.parse(mantenimientoJSON);
    if (!mantenimientos) return res.status(400).json('Json inexistente.');
    return res.status(200).json(mantenimientos);
  } catch (error) {
    console.error(error);
    return res.status(404).json('Error Interno del Servidor.');
  }
};

// Obtener Mantenimiento por ID
exports.getMantenimientoById = async (req, res) => {
  try {
    const mantenimientoId = req.params.mantenimientoId;
    let mantenimientoJSON = fs.readFileSync(
      'datos/mantenimientos.json',
      'utf8'
    );
    let mantenimientos = JSON.parse(mantenimientoJSON);

    let mantenimiento = mantenimientos.filter(
      (mantenimiento) => Number(mantenimiento.id) === Number(mantenimientoId)
    );

    if (mantenimiento.length === 0)
      return res.status(400).json('No se encontro un Técnico con ese Id.');

    return res.status(200).json(mantenimiento);
  } catch (error) {
    console.error(error);
    return res.status(404).json('Error Interno del Servidor.');
  }
};

// Obtener Mantenimiento por tipo (A, B, C o D)
exports.getMantenimientoByTipo = async (req, res) => {
  try {
    const mantenimientoTipo = req.params.mantenimientoTipo;
    let mantenimientoJSON = fs.readFileSync(
      'datos/mantenimientos.json',
      'utf8'
    );
    let mantenimientos = JSON.parse(mantenimientoJSON);

    let mantenimiento = mantenimientos.filter(
      (mantenimiento) => mantenimiento.tipo_mantenimiento === mantenimientoTipo
    );

    if (mantenimiento.length === 0)
      return res
        .status(400)
        .json(`No se encontraron Mantenimientos del tipo ${mantenimientoTipo}`);

    return res.status(200).json(mantenimiento);
  } catch (error) {
    console.error(error);
    return res.status(404).json('Error Interno del Servidor.');
  }
};

// UPDATE Or MODIFY A Mantenimiento By ID
exports.updateMantenimiento = async (req, res) => {
  try {
    const { id, tecnico, cliente, fecha, caldera, tipo_mantenimiento } =
      req.body;

    let mantenimientoJSON = fs.readFileSync(
      'datos/mantenimientos.json',
      'utf8'
    );

    let mantenimientos = JSON.parse(mantenimientoJSON);
    if (!mantenimientos) return res.status(400).json('Json Inexistente.');

    let mantenimientoIndex = mantenimientos.findIndex(
      (mantenimiento) => Number(mantenimiento.id) === Number(id)
    );

    if (mantenimientoIndex === -1) {
      return res.status(400).send({
        error: `No existe el Mantenimiento con id: ${mantenimientoId}.`
      });
    }
    if (!tecnico) {
      return res
        .status(400)
        .send({ error: 'No ingreso el nombre del Técnico responsable.' });
    }
    if (!cliente) {
      return res.status(400).send({ error: 'No ingreso el dni del Cliente.' });
    }
    if (!fecha) {
      return res
        .status(400)
        .send({ error: 'No ingreso la Fecha del Mantenimiento.' });
    }
    if (!caldera) {
      return res
        .status(400)
        .send({ error: 'No selecciono el tipo de Caldera.' });
    }
    if (!tipo_mantenimiento) {
      return res
        .status(400)
        .send({ error: 'No selecciono el tipo de Mantenimiento.' });
    }

    const updatedMantenimiento = {
      id: Number(id),
      tecnico,
      cliente,
      fecha,
      caldera,
      tipo_mantenimiento
    };
    mantenimientos[mantenimientoIndex] = updatedMantenimiento;

    fs.writeFileSync(
      'datos/mantenimientos.json',
      JSON.stringify(mantenimientos),
      {
        encoding: 'utf8',
        flag: 'w'
      }
    );

    return res.status(200).json(mantenimientos);
  } catch (error) {
    console.error(error);
    return res.status(404).json('Error Interno del Servidor.');
  }
};

// DELETE A Mantenimiento By ID
exports.deleteMantenimiento = async (req, res) => {
  try {
    const mantenimientoId = req.params.mantenimientoId;
    let mantenimientoJSON = fs.readFileSync(
      'datos/mantenimientos.json',
      'utf8'
    );
    let mantenimientos = JSON.parse(mantenimientoJSON);

    if (!mantenimientos) return res.status(400).json('Json Inexistente.');

    let mantenimientoIndex = mantenimientos.findIndex(
      (mantenimiento) => Number(mantenimiento.id) === Number(mantenimientoId)
    );

    if (mantenimientoIndex === -1) {
      return res.status(400).send({
        error: `No existe el mantenimiento con id: ${mantenimientoId} .`
      });
    }

    mantenimientos.splice(mantenimientoIndex, 1);

    fs.writeFileSync(
      'datos/mantenimientos.json',
      JSON.stringify(mantenimientos),
      {
        encoding: 'utf8',
        flag: 'w'
      }
    );

    return res.status(200).json(mantenimientos);
  } catch (error) {
    console.error(error);
    return res.status(404).json('Error Interno del Servidor.');
  }
};
