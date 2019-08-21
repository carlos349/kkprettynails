const mongoose = require('mongoose');
const { Schema } = mongoose;

const september = new Schema ({
  servicio: {
    type:Object
  }
})  

module.exports = September = mongoose.model('september', september)