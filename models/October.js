const mongoose = require('mongoose');
const { Schema } = mongoose;

const october = new Schema ({
  servicio: {
    type:Object
  }
})  

module.exports = October = mongoose.model('october', october)