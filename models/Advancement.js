const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdvancementScheme = new Schema ({
    prest: {
        type: String
    },
    name: {
        type: String
    },
    reason:{
        type: String
    },
    total: {
        type: Number
    },
    date: {
		type: Date,
		default: Date.now
	}
})  
  
  module.exports = Advancement = mongoose.model('advancements', AdvancementScheme)