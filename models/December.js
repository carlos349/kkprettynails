const mongoose = require('mongoose');
const { Schema } = mongoose;

const december = new Schema ({
  servicio: {
    type:Object
  }
})  

module.exports = December = mongoose.model('december', december)