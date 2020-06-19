const mongoose = require('mongoose');
const { Schema } = mongoose;

const citasSchema = new Schema ({
  start: {
    type: String
  },
  end: {
    type: String
  },
  sort: {
    type: Number
  },
  date: {
    type:Date
  },
  services: {
    type: Object
  },
  client: {
    type: String
  },
  employe: {
    type: String
  },
  class: {
    type: String
  },
  process: {
    type: Boolean
  },
  confirmation: {
    type: Boolean
  },
  image: {
    type: Array
  }
})

module.exports = Citas = mongoose.model('citas', citasSchema)
