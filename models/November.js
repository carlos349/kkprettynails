const mongoose = require('mongoose');
const { Schema } = mongoose;

const november = new Schema ({
  registro: {
    type:Object
  }
})  

module.exports = November = mongoose.model('november', november)