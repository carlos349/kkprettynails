const mongoose = require('mongoose');
const { Schema } = mongoose;

const clienteSchema = new Schema ({
  nombre: {
    type: String
  },
  identidad: {
    type: String
  },
  telefono: {
    type: Number
  },
  fecha: {
    type: Date,
		default: Date.now
  }
})

module.exports = Cliente = mongoose.model('clientes', clienteSchema)
