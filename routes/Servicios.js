const express = require('express');
const service = express.Router()
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
service.use(cors())

//Apis
service.get('/', async (req,res) => {
  const servicios = await Servicio.find()
  res.json(servicios)
})

service.post('/', (req,res) => {
  const dataServicios = {
    nombre:req.body.nombreServicio,
    tiempo:req.body.tiempoServicio,
    precio:req.body.precioServicio,
    comision:req.body.comisionServicio,
    prestadores:req.body.prestadores,
    active:true
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

service.put('/changeActive/:id', (req, res) => {
  Servicio.findOne({_id:req.params.id})
  .then(servicios => {
    if (servicios.active) {
      Servicio.findByIdAndUpdate(req.params.id, {
        $set: {active:false}
      })
      .then(back => {
        res.json({
          status:false
        })
      })
      .catch(err => {
        res.send("error:" + err)
      })
    }
    else{
      Servicio.findByIdAndUpdate(req.params.id, {
        $set: {active:true}
      })
      .then(back => {
        res.json({
          status:true
        })
      })
      .catch(err => {
        res.send("error:" + err)
      })
    }
    console.log(servicios)
  })
})

service.put('/:id', (req, res) => {
    Servicio.findByIdAndUpdate(req.params.id, {
      $set: {
        nombre:req.body.nombreServicio,
        tiempo:req.body.tiempoServicio,
        precio:req.body.precioServicio,
        comision:req.body.comisionServicio,
        prestadores:req.body.prestadores,
      }
    })
    .then(servicio => {
      res.json({status: 'Servicio actualizado'})
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

service.get('/ServicesChartQuantity', (req, res) => {
  let chartdata = {
    labels: [],
    datasets: [ 
      {
        label: 'Ventas',
        backgroundColor: 'rgba(31, 86, 115, .8)',
        fontColor: 'red',
        data: []
      }
    ]
  }

  const thisDate = new Date()
  const date = thisDate.getMonth()

  let Month = 'Month'

  if (date === 0) {
    Month = January
  }else if (date === 1) {
    Month = February
  }else if (date === 2) {
    Month = March
  }else if (date === 3) {
    Month = April
  }else if (date === 4) {
    Month = May
  }else if (date === 5) {
    Month = June
  }else if (date === 6) {
    Month = July
  }else if (date === 7) {
    Month = August
  }else if (date === 8) {
    Month = September
  }else if (date === 9) {
    Month = October
  }else if (date === 10) {
    Month = November
  }else if (date === 11) {
    Month = December
  }

  Month.find({'registro.tipo':'servicio'})
  .then(back => {
    for (let indexTwo = 0; indexTwo < back.length; indexTwo++) {
      chartdata.labels.push(back[indexTwo].registro.nombre)
      chartdata.datasets[0].data.push(back[indexTwo].registro.cantidad)
    }
    res.json(chartdata)
  })

})

service.get('/ServicesQuantityPerMonth', (req, res) => {
  const thisDate = new Date()
  const date = thisDate.getMonth()

  let Month  = 'Month'

  if (date === 0) {
    Month = January
  }else if (date === 1) {
    Month = February
  }else if (date === 2) {
    Month = March
  }else if (date === 3) {
    Month = April
  }else if (date === 4) {
    Month = May
  }else if (date === 5) {
    Month = June
  }else if (date === 6) {
    Month = July
  }else if (date === 7) {
    Month = August
  }else if (date === 8) {
    Month = September
  }else if (date === 9) {
    Month = October
  }else if (date === 10) {
    Month = November
  }else if (date === 11) {
    Month = December
  }

  Month.find({'registro.tipo':'servicio'})
  .then(back => {
    res.json(back)
  })
  .catch(err => {
    res.send(err)
  })
  
})

service.get('/PrestadorChartQuantity', (req, res) => {
  let chartdata = {
    labels: [],
    datasets: [ 
      {
        label: 'Servicios',
        backgroundColor: 'rgba(31, 86, 115, .8)',
        fontColor: 'red',
        data: []
      }
    ]
  }

  const thisDate = new Date()
  const date = thisDate.getMonth()

  let Month = 'Month'

  if (date === 0) {
    Month = January
  }else if (date === 1) {
    Month = February
  }else if (date === 2) {
    Month = March
  }else if (date === 3) {
    Month = April
  }else if (date === 4) {
    Month = May
  }else if (date === 5) {
    Month = June
  }else if (date === 6) {
    Month = July
  }else if (date === 7) {
    Month = August
  }else if (date === 8) {
    Month = September
  }else if (date === 9) {
    Month = October
  }else if (date === 10) {
    Month = November
  }else if (date === 11) {
    Month = December
  }

  Month.find({'registro.tipo':'Prestador'})
  .then(back => {
    for (let indexTwo = 0; indexTwo < back.length; indexTwo++) {
      chartdata.labels.push(back[indexTwo].registro.nombre)
      chartdata.datasets[0].data.push(back[indexTwo].registro.cantidad)
    }
    res.json(chartdata)
  })

})

service.get('/prestadorQuantityPerMonth', (req, res) => {
  const thisDate = new Date()
  const date = thisDate.getMonth()

  let Month  = 'Month'

  if (date === 0) {
    Month = January
  }else if (date === 1) {
    Month = February
  }else if (date === 2) {
    Month = March
  }else if (date === 3) {
    Month = April
  }else if (date === 4) {
    Month = May
  }else if (date === 5) {
    Month = June
  }else if (date === 6) {
    Month = July
  }else if (date === 7) {
    Month = August
  }else if (date === 8) {
    Month = September
  }else if (date === 9) {
    Month = October
  }else if (date === 10) {
    Month = November
  }else if (date === 11) {
    Month = December
  }

  Month.find({'registro.tipo':'Prestador'})
  .then(back => {
    res.json(back)
  })
  .catch(err => {
    res.send(err)
  })
  
})

module.exports = service
