const mongoose = require('mongoose');
const { Schema } = mongoose; 


const notificationsSchema = new Schema({
    userName:{
        type:String
    },
    userImage: {
        type: String
    },
    detail: {
        type: String
    },
    link: {
        type: String
    },
    date: {
		type: Date,
		default: Date.now
	}
})

module.exports = Notifications = mongoose.model('notifications', notificationsSchema)