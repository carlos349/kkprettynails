const express = require('express')
const superUser = express.Router()
const cors = require('cors')
const bcrypt = require('bcrypt')
const User = require('../models/User')
users.use(cors())
process.env.SECRET_KEY = 'secret'
const credentials = require('../private/private-credentials')

superUser.post('/createSuperuser', async (req, res, next) => {
	
	const today = new Date()
	const userData = {
		first_name: 'admin',
		last_name: 'admin',
		email: 'admin@gmail.com',
		password: credentials,
		status: 2,
		linkLender: '',
		userImage: '',
		LastAccess: today,
		date: today
	}

	User.findOne({
		email: req.body.email
	})
	.then(user => {
		if(!user){
			bcrypt.hash(req.body.password, 10, (err, hash) => {
				userData.password = hash
				User.create(userData)
				.then(user => {
					res.json({status: user._id})
				})
				.catch(err => {
					res.send('error: ' + err)
				})
			})
		}else{
			res.json({error: 'User already exist'})
		}
	})
	.catch(err => {
		res.send('error: ' + err)
	})
})