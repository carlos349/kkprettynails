const mongoose = require('mongoose');
const { Schema } = mongoose;

const february = new Schema ({
  registro: {
    type:Object
  }
})  

module.exports = February = mongoose.model('february', february)