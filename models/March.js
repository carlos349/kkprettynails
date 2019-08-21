const mongoose = require('mongoose');
const { Schema } = mongoose;

const march = new Schema ({
  servicio: {
    type:Object
  }
})  

module.exports = March = mongoose.model('march', march)