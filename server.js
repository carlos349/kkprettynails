const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/kkprettynails-database', {
			useNewUrlParser: true
		})
		.then(db => console.log('DB in connected'))
		.catch(err => console.erro(err))


// settings
app.set('port', process.env.PORT || 3000)

//middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

//Routes

app.use('/users', require('./routes/Users.js'))
app.use('/ventas', require('./routes/Venta.js'))
app.use('/manicuristas', require('./routes/Manicuristas.js'))
app.use('/servicios', require('./routes/Servicios.js'))

//Static files

app.use(express.static(__dirname + '/public'))

// server in listened
app.listen(app.get('port'), () => {
	console.log('Server on port: ', app.get('port'))
})
