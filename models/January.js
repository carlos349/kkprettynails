const mongoose = require('mongoose');
const { Schema } = mongoose;

const january = new Schema ({
  registro: {
    type:Object
  }
})  

module.exports = January = mongoose.model('january', january)