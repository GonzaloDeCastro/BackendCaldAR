const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  razon_social: String,
  direccion: String,
  telefono: Number,
  correo: String,
  Empresa: String
});

module.exports = mongoose.model('Cliente', clienteSchema);
