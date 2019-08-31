const mongoose = require('mongoose');
const { Schema } = mongoose;

const expenses = new Schema ({
  expenses: {
    type:String
  },
  figure: {
    type:Number
  }
})  

module.exports = Expenses = mongoose.model('expenses', expenses)
