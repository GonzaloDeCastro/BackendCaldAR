const mongoose = require('mongoose');

const tecnicoSchema = new mongoose.Schema({
    id:Number,
    nombre: String,
    dni: Number,
    telefono: Number,
    correo: String,
    direccion: String,
    tipo: String
});

module.exports = mongoose.model('Tecnico', tecnicoSchema);