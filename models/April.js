const mongoose = require('mongoose');
const { Schema } = mongoose;

const april = new Schema ({
  servicio: {
    type:Object
  }
})  

module.exports = April = mongoose.model('april', april)