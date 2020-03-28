const mongoose = require('mongoose');
const {Schema} = mongoose

const providerSchema = new Schema({
  nombre:{
    type:String
  },
})

module.exports = Provider = mongoose.model("provider", providerSchema)