const mongoose = require('mongoose');
const {Schema} = mongoose

const historySchema = new Schema({
  fecha:{
    type: Date,
		default: Date.now
  },
  medida:{
    type:String
  },
  totalIdeal:{
    type:String
  },
  totalReal:{
    type:String
  },
  mes:{
    type:String
  },
  diferencia:{
    type:String
  },
})

module.exports = History = mongoose.model("history", historySchema)