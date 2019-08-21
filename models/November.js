const mongoose = require('mongoose');
const { Schema } = mongoose;

const november = new Schema ({
  servicio: {
    type:Object
  }
})  

module.exports = November = mongoose.model('november', november)