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
  active:{
    type:Boolean
  }
})

module.exports = Servicio = mongoose.model("servicios", servicioSchema)
