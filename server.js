const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const fs = require('fs')
const options = {
	key: fs.readFileSync('./ssl/server.key'),
	cert: fs.readFileSync('./ssl/server.crt')
}
const server = require('http').Server(app);
const https = require('https').Server(options, app)
// const http = require('http')
const io = require('socket.io')(server);
mongoose.connect('mongodb://localhost/kkprettynails-database', {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
		.then(db => console.log('DB in connected'))
		.catch(err => console.error(err))

//Websockets
io.on('connection', socket  => {
  socket.on('sendNotification', data => {
	  io.emit('notify', data);
  })
});

// settings
app.set('port', process.env.PORT || 443)

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
app.use('/metrics', require('./routes/Metrics.js'))
app.use('/citas', require('./routes/Citas.js'))
app.use('/expenses', require('./routes/Expenses.js'))
app.use('/inventario', require('./routes/Inventario.js'))
app.use('/clients', require('./routes/Clients.js'))
app.use('/pedidos', require('./routes/Pedidos.js'))
app.use('/notifications', require('./routes/Notifications.js'))


//Static files

app.use('/static', express.static(__dirname + '/public'));

// server in listened
// var httpServer = http.createServer(app);
// var httpsServer = https.createServer(options, app);

https.listen(app.get('port'), () => {
	console.log('Server on port: ', app.get('port'))
});

