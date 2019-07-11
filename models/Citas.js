const mongoose = require('mongoose');
const { Schema } = mongoose;

const citasSchema = new Schema ({
  start: {
    type: String
  },
  end: {
    type: String
  },
  title: {
    type: String
  },
  content: {
    type: String
  }
})

module.exports = Citas = mongoose.model('citas', citasSchema)
