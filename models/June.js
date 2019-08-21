const mongoose = require('mongoose');
const { Schema } = mongoose;

const june = new Schema ({
  servicio: {
    type:Object
  }
})  

module.exports = June = mongoose.model('june', june)