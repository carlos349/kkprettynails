const mongoose = require('mongoose');
const {Schema} = mongoose;

const PedidoSchema = new Schema ({
    
    date: {
      type: Date,
	  default: Date.now
    },
    nPedido: {
      type: Number
    },
    codigo: {
      type: String
    },
    cliente: {
      type:String
    },
    tipoPago: {
      type:String
    },
    contacto: {
      type: String
    },
    estado: {
      type: String
    },
    articulo: {
      type: String
    },
    medio:{
      type:String
    },
    dateConfirm:{
      type:Date
    },
    dateProccess:{
      type:Date
    },
    total: {
      type: String
    }
  })
  
  module.exports = Pedido = mongoose.model('pedido', PedidoSchema)