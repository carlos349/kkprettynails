const mongoose = require('mongoose');
const { Schema } = mongoose;

const InventorySchema = new Schema ({
    producto: {
      type: String
    },
    marca: {
      type: String
    },
    gramos: {
      type: Number
    },
    cantidad: {
      type: Number
    },
    monto: {
      type: Number
    },
    montoTotal: {
      type: Number
    },
    servicios:{
      type: Object
    },
    serviciosId:{
      type: Object
    },
    fecha: {
      type: Date,
      default: Date.now
    }
  })
  
  module.exports = Inventory = mongoose.model('inventario', InventorySchema)