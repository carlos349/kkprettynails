const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const server = require('http').Server(app);
const io = require('socket.io')(server);
const vhost = require('vhost');

mongoose.connect('mongodb://localhost/kkprettynails-database', {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
		.then(db => console.log('DB in connected'))
		.catch(err => console.error(err))

//Websockets
io.on('connection', socket  => {
  socket.on('sendNotification', data => {
	  console.log(data)
	  io.emit('notify', data);
  })
});

// settings
app.set('port', process.env.PORT || 4200)

//middlewares
app.use(vhost('kkprettynailsback', app))
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
server.listen(app.get('port'), () => {
	console.log('Server on port: ', app.get('port'))
})
