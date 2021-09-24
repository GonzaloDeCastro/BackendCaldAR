const tecnicoSchema = require('../modelos/modeloTecnicos')

// Add Tecnicos
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

// Get Tecnicos
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

// Get Tecnico By ID
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

// Delete tecnico By ID
exports.deleteTecnico = async (req, res) => {
  try {
    const { tecnicoId } = req.params;
    const tecnico = await tecnicoSchema.findByIdAndDelete(tecnicoId);

    if (!tecnico) return res.status(400).json('Error al eliminar al Técnico.');

    return res.status(200).json('El usuario ha sido eliminado correctamente.');
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};


// Get Tecnico By tipo (A, B, C o D)
exports.getTecnicoByTipo = async (req, res) => {
  try {
    const { tipo } = req.params;
    const tecnicos = await tecnicoSchema.find({ tipo });
    if (tecnicos.length === 0)
      return res.status(400).json('No existen Técnicos de ese tipo.');

    return res.status(200).json(tecnicos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};


// Update Tecnico By ID
exports.updateTecnico = async (req, res) => {
  try {
    const body = req.body;

    if (!body.tecnicoId)
      return res.status(400).json(`No existe un Técnico con ese: ${body}`);

    const tecnico = await tecnicoSchema.findByIdAndUpdate(body.userId, body, {
      new: true,
    });

    if (!tecnico) return res.status(400).json('Error al actualizar el Técnico.');

    return res.status(200).json(tecnico);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};




