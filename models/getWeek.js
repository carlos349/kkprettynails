const mongoose = require('mongoose');
const { Schema } = mongoose;

const getweeksSchema = new Schema ({
    date: {
		type: Date
	}
})  

module.exports = GetWeeks = mongoose.model('getweeks', getweeksSchema)