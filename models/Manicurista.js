const mongoose = require('mongoose');
const {Schema} = mongoose

const manicuristaSchema = new Schema({
  nombre:{
    type:String
  },
  documento:{
    type:String
  },
  porcentaje:{
    type:Number
  },
  comision:{
    type:Number
  },
  advancement: {
    type:Number
  }
})

module.exports = Manicurista = mongoose.model("manicuristas", manicuristaSchema)
