const mongoose = require('mongoose');
const {Schema} = mongoose

const servicioSchema = new Schema({
  nombre:{
    type:String
  },
  tiempo:{
    type:Number
  },
  precio:{
    type:Number
  },
  comision:{
    type:Number
  },
  descuento: {
    type: Boolean
  },
  prestadores:{
    type:Array
  },
  productos:{
    type:Array
  },
  category: {
    type: String
  },
  active:{
    type:Boolean
  }
})

module.exports = Servicio = mongoose.model("servicios", servicioSchema)
