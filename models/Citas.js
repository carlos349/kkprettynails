const mongoose = require('mongoose');
const { Schema } = mongoose;

const citasSchema = new Schema ({
  start: {
    type: String
  },
  end: {
    type: String
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
  }
})

module.exports = Citas = mongoose.model('citas', citasSchema)
