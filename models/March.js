const mongoose = require('mongoose');
const { Schema } = mongoose;

const march = new Schema ({
  registro: {
    type:Object
  }
})  

module.exports = March = mongoose.model('march', march)