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
  restTime: {
    type:String
  },
  restDay: {
    type:Number
  },
  advancement: {
    type:Number
  },
  class: {
    type:String
  },
  date: {
    type: Date,
		default: Date.now
  }
})

module.exports = Manicurista = mongoose.model("manicuristas", manicuristaSchema)
