const mongoose = require('mongoose')
const { Schema } = mongoose;

const VentaSchema = new Schema({
	cliente: {
		type: String
	},
	clientedocumento: {
		type: String,
		required: true
	},
	manicurista: {
		type: String
	},
	servicios: {
		type: String
	},
	comision: {
		type: Number
	},
	ganancianeta: {
		type: Number
	},
	ganancialocal: {
		type: Number
	},
	total: {
		type: Number
	},
	fecha: {
		type: Date,
		default: Date.now
	}

})

module.exports = Venta = mongoose.model('ventas', VentaSchema)
