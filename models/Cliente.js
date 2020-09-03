const mongoose = require('mongoose');
const { Schema } = mongoose;

const clienteSchema = new Schema ({
  nombre: {
    type: String
  },
  identidad: {
    type: String
  },
  password: {
    type: String
  },
  correoCliente: {
    type: String
  },
  instagramCliente: {
    type: String
  },
  participacion: {
    type: Number
  },
  recomendacion: {
    type: String
  },
  idRecomendador: {
    type: String
  },
  recomendaciones: {
    type: Number
  },
  ultimaFecha: {
    type: Date, 
    default: Date.now
  },
  historical: {
    type: Array
  },
  fecha: {
    type: Date,
		default: Date.now
  },
  birthday: {
    type: Date
  },
  userImage: {
    type: String
  }
})

module.exports = Clientes = mongoose.model('clientes', clienteSchema)
