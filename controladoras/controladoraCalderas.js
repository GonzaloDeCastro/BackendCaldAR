

const { response } = require('express');
const fs = require('fs');

const calderaSchema = require('../modelos/modeloCalderas')


exports.agregarCaldera = async(req, res) => {
  try{

    const caldera = new calderaSchema(req.body)
    const nuevaCaldera = await caldera.save()

    return res.status(201).json({
      dato: nuevaCaldera,
      error: false
    })
  }
  catch (error){
    return res.status(400).json({
      error:true,
      message: error
    })
  }
}
// Crear una Nueva Caldera
/*
exports.addNewcaldera = async (req, res) => {
  try {
    
    const { direccion, tipo } = req.body; //data from POSTMAN

    let calderaJSON = fs.readFileSync('datos/calderas.json', 'utf8'); //data from JSON file
    let calderas = JSON.parse(calderaJSON);
    if (!calderas) return res.status(400).json('Json inexistente.');  //error no JSON file
    
    if (!direccion) {
      return res.status(400).send({ error: 'No ingreso direccion de la caldera.' });
    }

    if (!tipo) {
      return res.status(400).send({ error: 'No especifico el tipo de caldera.' });
    }

    const calderaId = Number(calderas[calderas.length - 1].id) + 1;
    const newcaldera = { id: calderaId, direccion, tipo };
    calderas.push(newcaldera);

    fs.writeFileSync('datos/calderas.json', JSON.stringify(calderas), {
      encoding: 'utf8',
      flag: 'w',
    });

    return res.status(200).json(calderas);

  } catch (error) {

    console.error(error);  //error

  }
};*/

exports.getAllcalderas = async (req, res) => {
  try {
    const response = await calderaSchema.find()
    return res.status(200).json({
      data: response,
      error: false,
    });
  } 
  catch (error) {
    return res.status(400).json({
      error: true,
      message:error
    })
  }
};

/*
// Obtener calderas
exports.getAllcalderas = async (req, res) => {
  try {
    let calderaJSON = fs.readFileSync('datos/calderas.json', 'utf8');
    let calderas = JSON.parse(calderaJSON);
    if (!calderas) return res.status(400).json('Json inexistente.');
    return res.status(200).json(calderas);
  } catch (error) {
    console.error(error);
  }
};
*/

// Obtener Caldera por ID
exports.getcalderaById = async (req, res) => {
  try {
    const response = await calderaSchema.findOne({ _id: req.params.calderaId })

    if(!response || response.length === 0) {
      return res.status(404).json({
        error: true,
        message: "Usuario no encontrado"
      })     
    }

    return res.status(200).json({
      data:response,
      error: false
    })
  }
  catch (error){
    return res.status(400).json({
      error: true,
      message: error
    })
  }
}
/*
exports.getcalderaById = async (req, res) => {
  try {
    const calderaId = req.params.calderaId;
    let calderaJSON = fs.readFileSync('datos/calderas.json', 'utf8');
    let calderas = JSON.parse(calderaJSON);

    let caldera = calderas.filter(
      (caldera) => Number(caldera.id) === Number(calderaId)
    );

    if (caldera.length === 0)
      return res.status(400).json('No se encontro una caldera con ese Id.');

    return res.status(200).json(caldera);
  } catch (error) {
    console.error(error);
  }
};*/


// Obtener Caldera por tipo (A, B, C, o D)
exports.getcalderaByTipo = async (req, res) => {
  try {
    const calderaTipo = req.params.calderaTipo;
    let calderaJSON = fs.readFileSync('datos/calderas.json', 'utf8');
    let calderas = JSON.parse(calderaJSON);

    let caldera = calderas.filter(
      (caldera) => caldera.tipo === calderaTipo
    );

    if (caldera.length === 0)
      return res.status(400).json(`No se encontraron calderas del tipo ${calderaTipo}`);

    return res.status(200).json(caldera);

  } catch (error) {
    console.error(error);
    return res.status(500).json('Internal server error.');
  }
};


// UPDATE Or MODIFY A caldera By ID
exports.updatecaldera = async (req, res) => {
  try {
    
    const { id, direccion, tipo } = req.body;
    
    let calderaJSON = fs.readFileSync('datos/calderas.json', 'utf8');

    let calderas = JSON.parse(calderaJSON);
    if (!calderas) return res.status(400).json('Json Inexistente.');
    
    let calderaIndex = calderas.findIndex(
      (caldera) => Number(caldera.id) === Number(id)
    );
    
    if (calderaIndex === -1) {
      return res
        .status(400)
        .send({ error: `No existe la caldera con id: ${calderaId} .` });
    }
    
    if (!direccion) {
      return res.status(400).send({ error: 'No ingreso descripcion de la caldera.' });
    }

    if (!tipo) {
      return res.status(400).send({ error: 'No especifico el tipo de caldera.' });
    }

    const updatedcaldera = {
      id: Number(id),
      direccion,
      tipo,
    };

    calderas[calderaIndex] = updatedcaldera;

    fs.writeFileSync('datos/calderas.json', JSON.stringify(calderas), {
      encoding: 'utf8',
      flag: 'w',
    });

    return res.status(200).json(calderas);

  } catch (error) {
    console.error(error);
    return res.status(500).json('Internal server error.');
  }
};

exports.deletecaldera = async (req, res) => {
  try {
    const response = await calderaSchema.findOneAndRemove({ _id: req.params.calderaId})

    if (!response || response.length === 0) {
      return res.status(404).json({
        error: true,
        message: "Usuario no encontrado para eliminar"
      })
    }
    return res.status(202).json({
      data:response,
      error: false,
    })
  } 
    catch (error) {
      return res.status(400).json({
        error: true,
        message: error
      })
  }
};


/*
// DELETE A caldera By ID
exports.deletecaldera = async (req, res) => {
  try {
    const calderaId = req.params.calderaId;

    let calderaJSON = fs.readFileSync('datos/calderas.json', 'utf8');

    let calderas = JSON.parse(calderaJSON);
    if (!calderas) return res.status(400).json('Json Inexistente.');

    let calderaIndex = calderas.findIndex(
      (caldera) => Number(caldera.id) === Number(calderaId)
    );

    if (calderaIndex === -1) {
      return res
        .status(400)
        .send({ error: `No existe el edificio con id: ${calderaId} .` });
    }

    calderas.splice(calderaIndex, 1);

    fs.writeFileSync('datos/calderas.json', JSON.stringify(calderas), {
      encoding: 'utf8',
      flag: 'w',
    });

    return res.status(200).json(calderas);

  } catch (error) {
    console.error(error);
    return res.status(500).json('Internal server error.');
  }
};
*/