const mongoose = require('mongoose')
const { Schema } = mongoose;

const VentaSchema = new Schema({
	cliente: {
		type: String
	},
	manicurista: {
		type: String
	},
	servicios: {
		type: Array
	},
	descuento: {
		type: Number
	},
	ganancialocal: {
		type: Number
	},
	comision: {
		type: Number
	},
	pagoEfectivo: {
		type: Number
	},
	pagoOtros: {
		type: Number
	},
	pagoRedC: {
		type: Number
	},
	pagoTransf: {
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
