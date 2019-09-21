const mongoose = require('mongoose');
const { Schema } = mongoose;

const october = new Schema ({
  registro: {
    type:Object
  }
})  

module.exports = October = mongoose.model('october', october)