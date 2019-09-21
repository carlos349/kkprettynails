const mongoose = require('mongoose');
const { Schema } = mongoose;

const august = new Schema ({
  registro: {
    type:Object
  }
})  

module.exports = August = mongoose.model('august', august)