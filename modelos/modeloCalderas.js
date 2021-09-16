const mongoose = require('mongoose');

const calderaSchema = new mongoose.Schema({
    id:Number,
    razon_social: String,
    direccion:String,
    tipo:String
});

module.exports = mongoose.model('Caldera', calderaSchema);