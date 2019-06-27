const mongoose = require('mongoose');
const {Schema} = mongoose

const servicioSchema = new Schema({
  nombre:{
    type:String
  },
  precio:{
    type:Number
  }
})

module.exports = Servicio = mongoose.model("servicios", servicioSchema)
