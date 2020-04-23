const mongoose = require('mongoose');
const { Schema } = mongoose;

const expenses = new Schema ({
  expense: {
    type:String
  },
  lenderId: {
    type: String,
  },
  type: {
    type: String
  },
  figure: {
    type:Number
  },
  date: {
    type: Date,
		default: Date.now
  }
})  

module.exports = Expenses = mongoose.model('expenses', expenses)
