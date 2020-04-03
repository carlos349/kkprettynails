const mongoose = require('mongoose');
const {Schema} = mongoose

const providerSchema = new Schema({
  nombre:{
    type:String
  },
  rut:{
    type:Number
  },
  contacto:{
    type:String
  },
  contactoAdicional:{
    type:String
  },
  ubicacion:{
    type:String
  },
})

module.exports = Provider = mongoose.model("provider", providerSchema)