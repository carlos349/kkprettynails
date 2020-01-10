const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const Clientes = require('../models/Cliente')
users.use(cors())
process.env.SECRET_KEY = 'secret'
const multer = require('multer')
const { diskStorage } = require('multer')
const path = require('path')
const storage = diskStorage({
	destination: 'public/users',
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname));
	}
})

const upload = multer({
	storage
})

users.post('/registerImage/:id', upload.single("image"), async (req, res, next) => {
	const token = req.headers['x-access-token'];
	if (!token) {
		return res.status(401).json({auth: false, message: 'no token provided'})
	}

	try {
		const decoded = jwt.verify(token, process.env.SECRET_KEY)
		const verify = await User.findById(decoded._id)
		if (!verify) {
			return res.status(401).json({auth: false, message: 'invalid access'})
		}
	} catch(err) {
		return res.status(401).json({auth: false, message: 'token expired'})
	}

	const images = req.file.filename
	const id = req.params.id
	User.findByIdAndUpdate(id, {
		$set: {
			userImage: images
		}
	})
	.then(changeImage => {
		res.json({status:changeImage.userImage})
	})
})

users.get('/', async (req, res) => {
	const token = req.headers['x-access-token'];
	if (!token) {
		return res.status(401).json({auth: false, message: 'no token provided'})
	}

	try {
		const decoded = jwt.verify(token, process.env.SECRET_KEY)
		const verify = await User.findById(decoded._id)
		if (!verify) {
			return res.status(401).json({auth: false, message: 'invalid access'})
		}
	} catch(err) {
		return res.status(401).json({auth: false, message: 'token expired'})
	}
	
	const userss = await User.find()
  	res.json(userss)
})

users.get('/Clientes', async (req, res) => {
	const clients = await Clientes.find()
  	res.status(200).json(clients)
})

users.delete('/:id', async (req, res) => {
	const token = req.headers['x-access-token'];
	if (!token) {
		return res.status(401).json({auth: false, message: 'no token provided'})
	}

	try {
		const decoded = jwt.verify(token, process.env.SECRET_KEY)
		const verify = await User.findById(decoded._id)
		if (!verify) {
			return res.status(401).json({auth: false, message: 'invalid access'})
		}
	} catch(err) {
		return res.status(401).json({auth: false, message: 'token expired'})
	}

	const userss = await User.findByIdAndRemove(req.params.id)
  	res.status(200).json(userss)
})

users.put('/:id', async (req, res, next) => {
	const token = req.headers['x-access-token'];
	if (!token) {
		return res.status(401).json({auth: false, message: 'no token provided'})
	}

	try {
		const decoded = jwt.verify(token, process.env.SECRET_KEY)
		const verify = await User.findById(decoded._id)
		if (!verify) {
			return res.status(401).json({auth: false, message: 'invalid access'})
		}
	} catch(err) {
		return res.status(401).json({auth: false, message: 'token expired'})
	}

	const admin = req.body.admin
	if (admin) {
		User.findByIdAndUpdate(req.params.id, { $set: {admin: false}})
		.then(user => {
			res.json({status:false})
		})
		.catch(err => {
			res.send(err)
		})
	}else{
		User.findByIdAndUpdate(req.params.id, { $set: {admin: true}})
		.then(user => {
			res.json({status:true})
		})
		.catch(err => {
			res.send(err)
		})
	}
})


users.post('/register', async (req, res, next) => {
	const token = req.headers['x-access-token'];
	if (!token) {
		return res.status(401).json({auth: false, message: 'no token provided'})
	}

	try {
		const decoded = jwt.verify(token, process.env.SECRET_KEY)
		const verify = await User.findById(decoded._id)
		if (!verify) {
			return res.status(401).json({auth: false, message: 'invalid access'})
		}
	} catch(err) {
		return res.status(401).json({auth: false, message: 'token expired'})
	}
	
	const today = new Date()
	const userData = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email,
		password: req.body.password,
		admin: true,
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

users.post('/login', (req, res) => {
	const today = new Date()
	User.findOne({
		email: req.body.email
	})
	.then(user => {
		if(user){
			if(bcrypt.compareSync(req.body.password, user.password)){
				User.findByIdAndUpdate(user._id, {
					$set: {
						LastAccess: today
					}
				})
				.then(access => {
					const payload = {
						_id: user._id,
						first_name: user.first_name,
						last_name: user.last_name,
						email: user.email,
						admin: user.admin,
						userImage: user.userImage,
						LastAccess: user.LastAccess
					}
					let token = jwt.sign(payload, process.env.SECRET_KEY, {
						expiresIn: 60 * 60 * 24
					})
					res.json({token: token, admin: user.admin})
				})
			}else{
				res.json({error: 'pass incorrecto'})
			}
		}else{
			res.json({error: 'User does not exist'})
		}
	})
	.catch(err => {
		res.send(err)
	})
})

users.get('/data/:id', async (req, res, next) => {
	const token = req.headers['x-access-token'];
	if (!token) {
		return res.status(401).json({auth: false, message: 'no token provided'})
	}

	try {
		const decoded = jwt.verify(token, process.env.SECRET_KEY)
		const verify = await User.findById(decoded._id)
		if (!verify) {
			return res.status(401).json({auth: false, message: 'invalid access'})
		}
	} catch(err) {
		return res.status(401).json({auth: false, message: 'token expired'})
	}

	const data = await User.findById(req.params.id, {password: 0})
	if (!data) {
		res.status(404).send('User not found')
	}
	res.send(data)
})

users.put('/editData/:id', async (req, res, next) => {
	const token = req.headers['x-access-token'];
	if (!token) {
		return res.status(401).json({auth: false, message: 'no token provided'})
	}

	try {
		const decoded = jwt.verify(token, process.env.SECRET_KEY)
		const verify = await User.findById(decoded._id)
		if (!verify) {
			return res.status(401).json({auth: false, message: 'invalid access'})
		}
	} catch(err) {
		return res.status(401).json({auth: false, message: 'token expired'})
	}

	const type = req.body.type
	const id = req.params.id
	const data = req.body.data
	if (type == 'first') {
		const editFirst = await User.findByIdAndUpdate(id, {
			$set: {
				first_name: data
			}
		})
		if (!editFirst) {
			res.json({status: 'bad'})
		}
		res.json({status: 'ok'})
	}else if (type == 'last') {
		const editFirst = await User.findByIdAndUpdate(id, {
			$set: {
				last_name: data
			}
		})
		if (!editFirst) {
			res.json({status: 'bad'})
		}
		res.json({status: 'ok'})
	}else if (type == 'email') {
		const editFirst = await User.findByIdAndUpdate(id, {
			$set: {
				email: data
			}
		})
		if (!editFirst) {
			res.json({status: 'bad'})
		}
		res.json({status: 'ok'})
	}
})

users.put('/changePass/:id', async (req, res, next) => {
	const token = req.headers['x-access-token'];
	if (!token) {
		return res.status(401).json({auth: false, message: 'no token provided'})
	}

	try {
		const decoded = jwt.verify(token, process.env.SECRET_KEY)
		const verify = await User.findById(decoded._id)
		if (!verify) {
			return res.status(401).json({auth: false, message: 'invalid access'})
		}
	} catch(err) {
		return res.status(401).json({auth: false, message: 'token expired'})
	}
	
	const id = req.params.id
	const newPass = req.body.newPass
	const lastPass = req.body.lastPass
	
	const compare = await User.findById(id)
	if (!compare) {
		res.status(404).send('User not found')
	}else{
		if (bcrypt.compareSync(lastPass, compare.password)) {
			
			const hash = await bcrypt.hash(newPass, 10)
			if (!hash) {
				res.status(404).send('Error en encriptado')
			}
			const change = await User.findByIdAndUpdate(id, {
				$set: {
					password:hash
				}
			})
			if (!change) {
				res.status(404).send('User not found')
			}
			res.json({status:'ok'})
		}else{
			res.json({status:'incorrect pass'})
		}
	}
})

module.exports = users
