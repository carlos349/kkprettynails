const mongoose = require('mongoose');
const { Schema } = mongoose;

const CierresSchema = new Schema ({
    manual: {
        type: Object
    },
    sistema: {
        type: Object
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