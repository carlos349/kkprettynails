const mongoose = require('mongoose');
const { Schema } = mongoose;

const may = new Schema ({
  servicio: {
    type:Object
  }
})  

module.exports = May = mongoose.model('may', may)