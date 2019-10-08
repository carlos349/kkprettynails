const mongoose = require('mongoose');
const { Schema } = mongoose;

const CierresSchema = new Schema ({
    aperturaEfectivo: {
        type: Number
    },
    aperturaBanco:{
        type: Number
    },
    totalApertura: {
        type: Number
    },
    cierreEfectivo: {
        type: Number
    },
    cierreBanco: {
        type: Number
    },
    totalCierre: {
        type: Number
    },
    total: {
        type: Number
    },
    gastos: {
        type: Number
    },
    identificacionCierre: {
        type: String
    },
    fecha:{
        type: Date,
		default: Date.now
    }    
})  
  
  module.exports = Cierres = mongoose.model('cierres', CierresSchema)