const mongoose = require('mongoose');
const {Schema} = mongoose

const historySchema = new Schema({
  fecha:{
    type: Date,
		default: Date.now
  },
  user:{
    type:String
  },
  totalProduct:{
    type:String
  },
  array:{
    type:Object
  }
})

module.exports = History = mongoose.model("historyInventory", historySchema)