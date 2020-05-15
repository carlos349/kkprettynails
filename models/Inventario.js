const mongoose = require('mongoose');
const {Schema} = mongoose;

const InventorySchema = new Schema ({
    producto: {
      type: String
    },
    type: {
      type:String
    },
    cantidad: {
      type: Number
    },
    monto: {
      type: Number
    },
    entry: {
      type: Number
    },
    consume: {
      type: Number,
    },
    history: {
      type: Array,
    },
    total: {
      type: Number,
    },
    validAlert: {
      type: Boolean
    }
  })
  
  module.exports = Inventory = mongoose.model('inventario', InventorySchema)