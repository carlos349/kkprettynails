const express = require('express')
const ventas = express.Router()
const cors = require('cors')

const Venta = require('../models/Venta')
const Cliente = require('../models/Cliente')
const Manicurista = require('../models/Manicurista')
const January = require('../models/January')
const February = require('../models/February')
const March = require('../models/March')
const April = require('../models/April')
const May = require('../models/May')
const June = require('../models/June')
const July = require('../models/July')
const August = require('../models/August')
const September = require('../models/September')
const October = require('../models/October')
const November = require('../models/November')
const December = require('../models/December')
ventas.use(cors())

ventas.put('/updateServicesMonth/:service', (req, res) => {
  const thisDate = new Date()
  const date = thisDate.getMonth()
  const services = req.params.service

  let mes  = 'mes'

  if (date === 0) {
    mes = January
  }else if (date === 1) {
    mes = February
  }else if (date === 2) {
    mes = March
  }else if (date === 3) {
    mes = April
  }else if (date === 4) {
    mes = May
  }else if (date === 5) {
    mes = June
  }else if (date === 6) {
    mes = July
  }else if (date === 7) {
    mes = August
  }else if (date === 8) {
    mes = September
  }else if (date === 9) {
    mes = October
  }else if (date === 10) {
    mes = November
  }else if (date === 11) {
    mes = December
  }

  const createServices = {
      servicio:{
        servicio:{
          nombre:services,
          cantidad:1
        }
      }
  }

  for (let index = 0; index < 12; index++) {
    if (date === index) {
      mes.findOne({'servicio.servicio.nombre':services})
        .then(back => {
          if(!back){
            mes.create(createServices)
            .then(back => {
              res.json({'status':'ok'})
            })
            .catch(err => {
              res.send('error: ' + err)
            })
          }else{
            mes.updateOne({'servicio.servicio.nombre':services},{$inc:{'servicio.servicio.cantidad':1}})
            .then(back => {
              res.json({'status':'ok'})
            })
            .catch(err => {
              res.send('error: ' + err)
            })
          }
        })
        .catch(err => {
          res.send('error: ' + err)
        })
    }
  }

})

ventas.put('/updateServicesMonthDiscount/:service', (req, res) => {
  const thisDate = new Date()
  const date = thisDate.getMonth()
  const services = req.params.service
  
  let mes  = 'mes'

  if (date === 0) {
    mes = January
  }else if (date === 1) {
    mes = February
  }else if (date === 2) {
    mes = March
  }else if (date === 3) {
    mes = April
  }else if (date === 4) {
    mes = May
  }else if (date === 5) {
    mes = June
  }else if (date === 6) {
    mes = July
  }else if (date === 7) {
    mes = August
  }else if (date === 8) {
    mes = September
  }else if (date === 9) {
    mes = October
  }else if (date === 10) {
    mes = November
  }else if (date === 11) {
    mes = December
  }

  const createServices = {
      servicio:{
        servicio:{
          nombre:services,
          cantidad:1
        }
      }
  }

  for (let index = 0; index < 12; index++) {
    if (date === index) {
      mes.findOne({'servicio.servicio.nombre':services})
        .then(back => {
          if(!back){
            mes.create(createServices)
            .then(back => {
              res.json({'status':'ok'})
            })
            .catch(err => {
              res.send('error: ' + err)
            })
          }else{
            mes.updateOne({'servicio.servicio.nombre':services},{$inc:{'servicio.servicio.cantidad':-1}})
            .then(back => {
              res.json({'status':'ok'})
            })
            .catch(err => {
              res.send('error: ' + err)
            })
          }
        })
        .catch(err => {
          res.send('error: ' + err)
        })
    }
  }

})

ventas.post('/ingresocliente', (req, res) => {
  const today = new Date()
  const ClienteData = {
    nombre: req.body.nombre,
    identidad: req.body.identidad,
    created: today
  }

  Cliente.findOne({
    nombre: req.body.nombre
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
    nombre: req.body.identidad
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
    pago:req.body.mediopago,
    descuento:req.body.descuento,
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

