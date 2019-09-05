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
    gastos: {
        type: Number
    },
    fecha:{
        type: Date,
		default: Date.now
    }    
})  
  
  module.exports = Cierres = mongoose.model('cierres', CierresSchema)