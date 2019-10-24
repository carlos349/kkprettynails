const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/User')
const Clientes = require('../models/Cliente')
users.use(cors())

process.env.SECRET_KEY = 'secret'


users.get('/', async (req, res) => {
	const userss = await User.find()
  res.json(userss)
})
users.get('/Clientes', async (req, res) => {
	const clients = await Clientes.find()
  	res.json(clients)
})

users.delete('/:id', async (req, res) => {
	const userss = await User.findByIdAndRemove(req.params.id)
  res.json(userss)
})

users.put('/:id', (req, res) => {
	const admin = req.body.admin
	if (admin) {
		User.findByIdAndUpdate(req.params.id, { $set: {admin: false}})
		.then(user => {
			console.log(user)
			res.json({status:false})
		})
		.catch(err => {
			res.send('error: ' + err)
		})
	}else{
		User.findByIdAndUpdate(req.params.id, { $set: {admin: true}})
		.then(user => {
			console.log(user)
			res.json({status:true})
		})
		.catch(err => {
			res.send('error: ' + err)
		})
	}
})

users.post('/register', (req, res) => {
	const today = new Date()
	const userData = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email,
		password: req.body.password,
		admin: true,
		created: today
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
					res.json({status: user.email + ': Registered'})
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

users.post('/login', (req, res) => {
	User.findOne({
		email: req.body.email
	})
	.then(user => {
		if(user){
			if(bcrypt.compareSync(req.body.password, user.password)){
				const payload = {
					_id: user._id,
					first_name: user.first_name,
					last_name: user.last_name,
					email: user.email,
					admin: user.admin,
					image: user.image
				}
				let token = jwt.sign(payload, process.env.SECRET_KEY, {
					expiresIn: 1440
				})
				res.json({token: token, admin: user.admin})
			}else{
				res.json({error: 'pass incorrecto'})
			}
		}else{
			res.json({error: 'User does not exist'})
		}
	})
	.catch(err => {
		res.send('error: ' + err)
	})
})

module.exports = users
