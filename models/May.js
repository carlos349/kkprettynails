const mongoose = require('mongoose');
const { Schema } = mongoose;

const may = new Schema ({
  registro: {
    type:Object
  }
})  

module.exports = May = mongoose.model('may', may)