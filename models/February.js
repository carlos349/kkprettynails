const mongoose = require('mongoose');
const { Schema } = mongoose;

const february = new Schema ({
  servicio: {
    type:Object
  }
})  

module.exports = February = mongoose.model('february', february)