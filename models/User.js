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
	about: {
		type:String,
	},
	status: {
		type:Number,
		required:true
	},
	linkLender: {
		type: String
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
