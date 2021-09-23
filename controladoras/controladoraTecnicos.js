const { response } = require('express');
const fs = require('fs');


const tecnicoSchema = require('../modelos/modeloTecnicos')

// Crear una Nuevo Tecnico
exports.addNewTecnico = async(req, res) => {
  try{
    const tecnico = new tecnicoSchema(req.body)
    const nuevaTecnico = await tecnico.save()

    return res.status(201).json({
      dato: nuevaTecnico,
      error: false
    })
  }
  catch (error){
    return res.status(400).json({
      error:true,
      message: error
    })
  }
};

// GET All Tecnicos
exports.getAlltecnicos = async (req, res) => {
  try {
    const response = await tecnicoSchema.find()
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

// Obtener Tecnico por ID
exports.getTecnicoById = async (req, res) => {
  try {
    const response = await tecnicoSchema.findOne({ _id: req.params.tecnicoId })

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
};

// Obtener Tecnico por tipo (A, B, C o D)
exports.getTecnicoByTipo = async (req, res) => {
  try {
    const tecnicoTipo = req.params.tecnicoTipo;
    let tecnicoJSON = fs.readFileSync('datos/tecnicos.json', 'utf8');
    let tecnicos = JSON.parse(tecnicoJSON);

    let tecnico = tecnicos.filter((tecnico) => tecnico.tipo === tecnicoTipo);

    if (tecnico.length === 0)
      return res
        .status(400)
        .json(`No se encontraron Técnicos del tipo ${tecnicoTipo}`);

    return res.status(200).json(tecnico);
  } catch (error) {
    console.error(error);
    return res.status(404).json('Error Interno del Servidor.');
  }
};

// UPDATE Or MODIFY A Tecnico By ID
exports.updateTecnico = async (req, res) => {
  try {
    const { id, nombre, dni, telefono, correo, direccion, tipo } = req.body;

    let tecnicoJSON = fs.readFileSync('datos/tecnicos.json', 'utf8');

    let tecnicos = JSON.parse(tecnicoJSON);
    if (!tecnicos) return res.status(400).json('Json Inexistente.');

    let tecnicoIndex = tecnicos.findIndex(
      (tecnico) => Number(tecnico.id) === Number(id)
    );

    if (tecnicoIndex === -1) {
      return res
        .status(400)
        .send({ error: `No existe el Técnico con id: ${tecnicoId}.` });
    }
    if (!nombre) {
      return res
        .status(400)
        .send({ error: 'No ingreso el nombre del Técnico.' });
    }
    if (!dni) {
      return res.status(400).send({ error: 'No ingreso el dni del Técnico.' });
    }
    if (!telefono) {
      return res
        .status(400)
        .send({ error: 'No ingreso el telefono del Técnico.' });
    }
    if (!correo) {
      return res
        .status(400)
        .send({ error: 'No ingreso el correo del Técnico.' });
    }
    if (!direccion) {
      return res
        .status(400)
        .send({ error: 'No ingreso la dirección del Técnico.' });
    }
    if (!tipo) {
      return res
        .status(400)
        .send({ error: 'No especifico el tipo de Técnico.' });
    }

    const updatedTecnico = {
      id: Number(id),
      nombre,
      dni,
      telefono,
      correo,
      direccion,
      tipo
    };
    tecnicos[tecnicoIndex] = updatedTecnico;

    fs.writeFileSync('datos/tecnicos.json', JSON.stringify(tecnicos), {
      encoding: 'utf8',
      flag: 'w'
    });

    return res.status(200).json(tecnicos);
  } catch (error) {
    console.error(error);
    return res.status(404).json('Error Interno del Servidor.');
  }
};

// DELETE A tecnico By ID
exports.deleteTecnico = async (req, res) => {
  try {
    const tecnicoId = req.params.tecnicoId;
    let tecnicoJSON = fs.readFileSync('datos/tecnicos.json', 'utf8');
    let tecnicos = JSON.parse(tecnicoJSON);

    if (!tecnicos) return res.status(400).json('Json Inexistente.');

    let tecnicoIndex = tecnicos.findIndex(
      (tecnico) => Number(tecnico.id) === Number(tecnicoId)
    );

    if (tecnicoIndex === -1) {
      return res
        .status(400)
        .send({ error: `No existe el tecnico con id: ${tecnicoId} .` });
    }

    tecnicos.splice(tecnicoIndex, 1);

    fs.writeFileSync('datos/tecnicos.json', JSON.stringify(tecnicos), {
      encoding: 'utf8',
      flag: 'w'
    });

    return res.status(200).json(tecnicos);
  } catch (error) {
    console.error(error);
    return res.status(404).json('Error Interno del Servidor.');
  }
};
