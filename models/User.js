const mongoose = require('mongoose')
const { Schema } = mongoose;

const UserSchema = new Schema({
	first_name: {
		type: String
	},
	last_name: {
		type:String
	},
	email: {
		type: String,
		required:true
	},
	password: {
		type:String,
		required:true
	},
	admin: {
		type:Boolean,
		required:true
	},
	userImage: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now
	},
	LastAccess: {
		type: Date,
		default: Date.now
	}

})

module.exports = User = mongoose.model('users', UserSchema)
