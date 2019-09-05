const mongoose = require('mongoose');
const { Schema } = mongoose;

const CierresSchema = new Schema ({
    total: {
        type: Number
    },
    totalLocal:{
        type: Number
    },
    totalGanancia: {
        type: Number
    },
    totalReinversion: {
        type: Number
    },
    totalCredito: {
        type: Number
    },
    totalComision: {
        type: Number
    },
    fecha:{
        type: Date,
		default: Date.now
    }    
})  
  
  module.exports = Cierres = mongoose.model('cierres', CierresSchema)