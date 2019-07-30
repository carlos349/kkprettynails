const express = require('express')
const ventas = express.Router()
const cors = require('cors')

const Venta = require('../models/Venta')
const Cliente = require('../models/Cliente')
const Manicurista = require('../models/Manicurista')
ventas.use(cors())



ventas.post('/ingresocliente', (req, res) => {
  const today = new Date()
  const ClienteData = {
    nombre: req.body.nombre,
    identidad: req.body.identidad,
    correo: req.body.correo,
    created: today
  }

  Cliente.findOne({
    identidad: req.body.identidad
  })
  .then(cliente => {
    console.log(cliente)
    if (!cliente) {
      Cliente.create(ClienteData)
      .then(cliente => {
        res.json({status: 'Registrado'})
      })
      .catch(err => {
        res.send('error: ' + err)
      })
    }else{
      res.json({error: 'Cliente ya existe'})
    }
  })
  .catch(err => {
    res.send('error: ' + err)
  })
})

ventas.get('/', async (req, res) => {
  const ventas = await Venta.find()
  res.json(ventas)
})

ventas.get('/manicurista/:id', async (req, res) => {
  const id = req.params.id
  const ventas = await Venta.find({'manicurista': id})
  res.json(ventas)
})

ventas.post('/verificacioncliente', (req, res) => {

  Cliente.findOne({
    identidad: req.body.identidad
  })
  .then(cliente => {
    if (!cliente) {
      res.json({status: 'Cliente no existe'})
    }else{
      res.json({status: cliente.nombre})
    }
  })
  .catch(err => {
    res.send('error: ' + err)
  })
})

ventas.post('/procesar', (req, res) => {
  const today = new Date()
  const total = req.body.total
  const comision = '0.' + req.body.comision
  const comisionFinal = parseFloat(total) * parseFloat(comision)
  const comisionDosdecimales = comisionFinal.toFixed(2)
  console.log(comisionDosdecimales)
  const ganancia = parseFloat(total) * 0.10
  const gananciaLocal = parseFloat(total) * 0.50
  const venta = {
    cliente: req.body.cliente,
    clientedocumento: req.body.clientedocumento,
    manicurista: req.body.manicurista,
    servicios: req.body.servicios,
    comision: comisionFinal,
    ganancianeta: ganancia,
    ganancialocal: gananciaLocal,
    total: total,
    fecha: today
  }
  const documentoManicurista = req.body.documentoManicurista
  Venta.create(venta)
  .then(venta => {
    Manicurista.updateOne({documento:documentoManicurista},{
      $inc: {comision:venta.comision}
    })
    .then(comision => {
      Cliente.updateOne({identidad: venta.clientedocumento},{
        $inc: {participacion: 1}
      })
      .then(participacion => {
        res.json({status: 'Venta registrada'})
      })
    })
    .catch(err => {
      res.send('Error:' + err)
    })
  })
  .catch(err => {
    res.send('Error: ' + err)
  })
})


module.exports = ventas
