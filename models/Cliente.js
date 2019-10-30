const mongoose = require('mongoose');
const { Schema } = mongoose;

const clienteSchema = new Schema ({
  nombre: {
    type: String
  },
  identidad: {
    type: String
  },
  participacion: {
    type: Number
  },
  recomendacion: {
    type: String
  },
  recomendaciones: {
    type: Number
  },
  ultimaFecha: {
    type: Date, 
    default: Date.now
  },
  fecha: {
    type: Date,
		default: Date.now
  }
})

module.exports = Clientes = mongoose.model('clientes', clienteSchema)
