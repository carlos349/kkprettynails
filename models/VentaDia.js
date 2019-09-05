const mongoose = require('mongoose')
const { Schema } = mongoose;

const DaySaleSchema = new Schema({
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
	reinversion: {
		type: Number
	},
	credito: {
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

module.exports = VentaDia = mongoose.model('ventasDia', DaySaleSchema)