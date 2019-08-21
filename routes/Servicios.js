const express = require('express');
const servicio = express.Router()
const cors = require('cors');

//Models
const Servicio = require('../models/Servicios')
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

//router
servicio.use(cors())

//Apis
servicio.get('/', async (req,res) => {
  const servicios = await Servicio.find()
  res.json(servicios)
})

servicio.post('/', (req,res) => {
  const dataServicios = {
    nombre:req.body.nombreServicio,
    tiempo:req.body.tiempoServicio,
    precio:req.body.precioServicio,
    prestadores:req.body.prestadores
  }
  Servicio.findOne({
    nombre: req.body.nombreServicio
  })
  .then(servicio => {
    if (!servicio) {
      Servicio.create(dataServicios)
      .then(servicio => {
        res.json({status:"Servicio creado"})
      })
      .catch(err => {
        res.send("Error: " + err)
      })
    }
    else{
      res.json({status:"Servicio repetido"})
    }
  })
  .catch(err => {
    res.send("Error: " + err)
  })
})

servicio.delete('/:id', async (req, res) => {
    await Servicio.findByIdAndRemove(req.params.id);
    res.json({
      status: 'Servicio eliminado'
    })
})

servicio.put('/:id', (req, res) => {
    Servicio.findByIdAndUpdate(req.params.id, {
      $set: {
        nombre: req.body.nombre,
        precio: req.body.precio
      }
    })
    .then(servicio => {
      res.json({status: 'Servicio actualizado'})
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

servicio.get('/ServicesQuantityPerMonth', (req, res) => {
  const thisDate = new Date()
  const date = thisDate.getMonth()

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

  for (let index = 0; index < 12; index++) {
    if (date === index) {
      mes.find()
      .then(back => {
        res.json(back)
      })
    }
  }

})

module.exports = servicio
