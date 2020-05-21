const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const Clientes = require('../models/Cliente')
const email = require('../modelsMails/Mails')
const credentials = require('../private/private-credentials')
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
const mailCredentials = require('../private/mail-credentials')
const KMails = new email(mailCredentials)
const upload = multer({
	storage
})


users.get('/createSuperuser', async (req, res, next) => {
	console.log(credentials)
	const access = [
		{
			ruta: 'usuarios',
			validaciones: ['editar', 'registrar']
		}
	]
	const today = new Date()
	const userData = {
		first_name: 'admin',
		last_name: 'admin',
		email: 'admin@gmail.com',
		password: credentials,
		status: 1,
		access: access,
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
			bcrypt.hash(userData.password, 10, (err, hash) => {
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

users.post('/sendNewPass', async (req, res) => {
	const email = req.body.email
	const user = await User.findOne({email: email})
	if (user) {
		const newPass = Date.now()
		console.log(newPass.toString())
		const hash = await bcrypt.hash(newPass.toString(), 10)
		if (!hash) {
			res.status(404).send('Error en encriptado')
		}
		const change = await User.findByIdAndUpdate(user._id, {
			$set: {password: hash}
		})
		if (!change) {
			res.status(404).send('User not found')
		}
		const mail = {
            from: "kkprettynails",
            to: email,
            subject: 'Contraseña provicional, SYSWA Gestión',
            html: `<div style="width: 50%;margin: auto;background-color: #f8f9fe;box-shadow: 0 2px 5px 0 rgba(0,0,0,.14);padding: 20px;font-family: 'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#32325d;text-align:justify;">     
                <h1>Estimado ${user.first_name} ${user.last_name}, esta es su clave provisoria. Al ingresar a nuestro sistema debe modificar dicha clave en "Perfil de usuario".</h1>
				<h3 style="color:#32325d !important;">Contaseña: ${newPass} </h3>
                <style>h3{color:#32325d;}</style>
            </div>`
        }
		try{
        	const send = await KMails.sendMail(mail)
			res.json({status: 'ok'})
		}catch(err){
			res.json({status: 'bad'})
			console.log(err)
		}
	}else{
		res.json({status: 'bad'})
	}
	
})

users.post('/editData/:id', upload.single("image"), async (req, res, next) => {
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
	const firstName = req.body.first_name  
	const lastName = req.body.last_name 
	const Mail = req.body.email
	const about = req.body.about
	if(req.file){
		const images = req.file.filename
		const change = await User.findByIdAndUpdate(id, {
			$set: {
				first_name: firstName,
				last_name: lastName,
				email:Mail,
				about:about,
				userImage: images
			}
		})
		res.json({status:change, image:images})
	}else{
		const change = await User.findByIdAndUpdate(id, {
			$set: {
				first_name: firstName,
				last_name: lastName,
				email:Mail,
				about: about
			}
		})
		res.json({status:change, image: ''})
	}
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

	const status = req.body.status
	const employe = req.body.employe
	if(status == 3){
		const update = await User.findByIdAndUpdate(req.params.id, { $set: {status: status, linkLender: employe}})
		if (update) {
			console.log(update)
			res.json(update)
		}
	}else{
		const update = await User.findByIdAndUpdate(req.params.id, { $set: {status: status, linkLender: ''}})
		if (update) {
			res.json(update)
		}
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
		about: '',
		status: 2,
		access: [],
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
						about: user.about,
						status: user.status,
						access: user.access,
						userImage: user.userImage,
						LastAccess: user.LastAccess,
						linkLender: user.linkLender
					}
					let token = jwt.sign(payload, process.env.SECRET_KEY, {
						expiresIn: 60 * 60 * 24
					})
					res.json({token: token, status: user.status, access: user.access})
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

users.put('/editAccess/:id', async (req, res) => {
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
	const accessss = req.body.access
	try {
		const modifyAccess = await User.findByIdAndUpdate(id, {
			$set: {access: accessss}
		})
		if (modifyAccess) {
			const user = await User.findOne({ email: req.body.email })
			if (user) {
				const payload = {
					_id: user._id,
					first_name: user.first_name,
					last_name: user.last_name,
					email: user.email,
					about: user.about,
					status: user.status,
					access: user.access,
					userImage: user.userImage,
					LastAccess: user.LastAccess,
					linkLender: user.linkLender
				}
				let token = jwt.sign(payload, process.env.SECRET_KEY, {
					expiresIn: 60 * 60 * 24
				})
				return res.json({status: 'ok', token: token})
			}
		}
	}catch(err) {
		return res.json({status: 'bad'})
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
