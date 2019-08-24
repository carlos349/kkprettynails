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
	pago: {
		type: String
	},
	descuento: {
		type: Number
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
