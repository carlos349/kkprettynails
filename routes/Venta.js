const express = require('express')
const ventas = express.Router()
const cors = require('cors')

const Venta = require('../models/Venta')
const VentaDia = require('../models/VentaDia')
const Cierres = require('../models/Cierres')
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

ventas.get('/getClosing/:id', (req, res) => {
  
  Cierres.findById(req.params.id)
  .then(cierre => {
    res.json(cierre)
  })
  .catch(err => {
    res.send(err)
  })
  
})

ventas.get('/prueba', (req, res) => {
  const dateNow = new Date()
  const formatDate = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()

  dateNow.setDate(dateNow.getDate() + 1)
  const formatDateTwo = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()
  const dateTomorrow = new Date(formatDateTwo)
  
  Cierres.find({
    fecha: { $gte: formatDate, $lte: formatDateTwo }
  })
  .then(resp => {
    res.json({status: resp.length})
  })
})

ventas.get('/closingPerMonth/:month', (req, res) => {
  const monthSelect = parseFloat(req.params.month)
  const closing = []
  Cierres.find()
  .then(cierres => {
    for (let index = 0; index < cierres.length; index++) {
      if (monthSelect === cierres[index].fecha.getMonth()) {
        closing.push(cierres[index])
      }
    }
    res.json(closing)
  })
  .catch(err => {
    res.send(err)
  })
})

ventas.get('/Closing', (req, res) => {
  const dateNow = new Date()
  const month = dateNow.getMonth()
  const closing = []
  Cierres.find()
  .then(cierres => {
    for (let index = 0; index < cierres.length; index++) {
      if (month === cierres[index].fecha.getMonth()) {
        closing.push(cierres[index])
      }
    }
    res.json(closing)
  })
  .catch(err => {
    res.send(err)
  })
})

ventas.get('/getClosingDay', (req, res) => {
  const dateNow = new Date()
  const formatDate = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()

  dateNow.setDate(dateNow.getDate() + 1)
  const formatDateTwo = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()
  

  const data = {
    efectivo: 0,
    banco: 0,
    total: 0
  }
  
  VentaDia.find()
  .then(ventas => {
    if (ventas.length > 0) {
      for (let index = 0; index < ventas.length; index++) {
        if (ventas[index].pago == 'tarjeta') {
          data.banco = data.banco + ventas[index].total
        }else{
          data.efectivo = data.efectivo + ventas[index].total
        }
      }
      
      data.total = data.banco + data.efectivo
      res.json(data)
    }else{
      res.json({status: 'bad'})
    }
  })
  .catch(err => {
    res.send(err )
  })
})

ventas.get('/CloseDay/:name', (req, res) => {
  const closeName = req.params.name
  const dateNow = new Date()
  const formatDate = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()

  dateNow.setDate(dateNow.getDate() + 1)
  const formatDateTwo = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()
  const dateTomorrow = new Date(formatDateTwo)
  
  let DaySales = {
    cierreEfectivo: 0,
    cierreBanco: 0,
    totalCierre: 0,
    identificacionCierre: ''
  }

  let DaySalesTomorrow = {
    aperturaEfectivo: 0,
    aperturaBanco: 0,
    totalApertura: 0,
    cierreEfectivo: 0,
    cierreBanco: 0,
    totalCierre: 0,
    gastos: 0,
    identificacionCierre: '',
    fecha: dateTomorrow
  }

  let DaySalesThree = {
    aperturaEfectivo: 0,
    aperturaBanco: 0,
    totalApertura: 0,
    cierreEfectivo: 0,
    cierreBanco: 0,
    totalCierre: 0,
    gastos: 0,
    identificacionCierre: '',
    fecha: new Date()
  }

  VentaDia.find()
  .then(ventas => {
    if (ventas.length > 0) {
      for (let index = 0; index < ventas.length; index++) {
        if (ventas[index].pago == 'tarjeta') {
          DaySales.cierreBanco = DaySales.cierreBanco + ventas[index].total
        }else{
          DaySales.cierreEfectivo = DaySales.cierreEfectivo + ventas[index].total
        }
      }
      Cierres.find()
      .then(lastDate => {
        
      })
      Cierres.find({
        fecha: { $gte: formatDate, $lte: formatDateTwo }
      })
      .then(close => {
        DaySales.identificacionCierre = closeName
        if (close.length === 0) {
          Cierres.find().sort({fecha: -1}).limit(1)
          .then(lastDate => { 
            DaySalesThree.aperturaEfectivo = lastDate[0].aperturaEfectivo
            DaySalesThree.aperturaBanco = lastDate[0].aperturaBanco
            DaySalesThree.totalApertura = lastDate[0].totalApertura
            DaySales.totalCierre = lastDate[0].totalApertura + DaySales.cierreBanco + DaySales.cierreEfectivo
            Cierres.create(DaySalesThree)
            .then(closing => {
              Cierres.findByIdAndUpdate(closing._id, 
                { 
                $set : { cierreEfectivo: DaySales.cierreEfectivo, cierreBanco: DaySales.cierreBanco, totalCierre: DaySales.totalCierre, identificacionCierre: DaySales.identificacionCierre  }
                })
                .then(editClose => {
                  DaySalesTomorrow.aperturaEfectivo = DaySales.cierreEfectivo
                  DaySalesTomorrow.aperturaBanco = DaySales.cierreBanco
                  DaySalesTomorrow.totalApertura = DaySales.totalCierre
                  Cierres.create(DaySalesTomorrow)
                  .then(newClose => {
                    VentaDia.remove({})
                    .then(done => {
                      res.json({status: 'ok'})
                    })
                    .catch(err => {
                      res.send(err)
                    })
                  })
                  .catch(err => {
                    res.send(err)
                  })
                })
                .catch(err => {
                  res.send(err)
                })
            })
            .catch(err => {
              res.send(err)
            })
          })
        }else{
            DaySales.totalCierre = close[0].totalApertura + DaySales.cierreBanco + DaySales.cierreEfectivo
            Cierres.findOneAndUpdate({fecha: { $gte: formatDate, $lte: formatDateTwo }}, 
            { 
             $set : { cierreEfectivo: DaySales.cierreEfectivo, cierreBanco: DaySales.cierreBanco, totalCierre: DaySales.totalCierre, identificacionCierre: DaySales.identificacionCierre  }
            })
            .then(back => {
              DaySalesTomorrow.aperturaEfectivo = DaySales.cierreEfectivo
              DaySalesTomorrow.aperturaBanco = DaySales.cierreBanco
              DaySalesTomorrow.totalApertura = DaySales.totalCierre
              Cierres.create(DaySalesTomorrow)
              .then(newCierre => {
                VentaDia.remove({})
                .then(finish => {
                  res.json({status: 'ok'})
                })
                .catch(err => {
                  res.send(err)
                })
              })
              .catch(err => {
                res.send(err)
              })
            })
            .catch(err => {
              res.send(err)
            })
        }
      })
      .catch(err => {
        res.send(err)
      })
    }else{
      res.json({'status':'bad'})
    }
  })
  .catch(err => {
    res.send(err)
  })
})

ventas.get('/getMonthPerMonthSelected/:month', (req, res) => {
  const monthSelected = new Date(req.params.month) 
  const date = monthSelected.getMonth()

  let month  = 'month'
  let monthTwo = 'month'

  if (date === 0) {
    month = 'Enero'
    monthTwo = 'Diciembre'
  }else if (date === 1) {
    month = 'Febrero'
    monthTwo = 'Enero'
  }else if (date === 2) {
    month = 'Marzo'
    monthTwo = 'Febrero'
  }else if (date === 3) {
    month = 'Abril'
    monthTwo = 'Marzo'
  }else if (date === 4) {
    month = 'Mayo'
    monthTwo = 'Abril'
  }else if (date === 5) {
    month = 'Junio'
    monthTwo = 'Mayo'
  }else if (date === 6) {
    month = 'Julio'
    monthTwo = 'Junio'
  }else if (date === 7) {
    month = 'Agosto'
    monthTwo = 'Julio'
  }else if (date === 8) {
    month = 'Septiembre'
    monthTwo = 'Agosto'
  }else if (date === 9) {
    month = 'Octubre'
    monthTwo = 'Septiembre'
  }else if (date === 10) {
    month = 'Noviembre'
    monthTwo = 'Octubre'
  }else if (date === 11) {
    month = 'Deciembre'
    monthTwo = 'Noviembre'
  }

  let chartdata = {
    labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
    datasets: [ 
      {
        label: monthTwo,
        backgroundColor: '#f4861f',
        data: []
      },
      {
        label: month,
        backgroundColor: '#7c2929',
        data: []
      }
    ]
  }

  let salesArray = []

  Venta.find()
  .then(ventas => {
    for (let indexOne = 0; indexOne < chartdata.labels.length; indexOne++) {
      let datasets = chartdata.labels[indexOne]
      let sumDay = 0
      let sumDayTwo = 0
      for (let index = 0; index < ventas.length; index++) {
        if (datasets === ventas[index].fecha.getDate() && date === ventas[index].fecha.getMonth()) {
          sumDay = parseFloat(ventas[index].total) + parseFloat(sumDay)
          salesArray.push(ventas[index])
        }
      }
      for (let indexTwo = 0; indexTwo < ventas.length; indexTwo++) {
        if (datasets === ventas[indexTwo].fecha.getDate() && date - 1 === ventas[indexTwo].fecha.getMonth()) {
          sumDayTwo = parseFloat(ventas[indexTwo].total) + parseFloat(sumDayTwo)
        }else if (datasets === ventas[indexTwo].fecha.getDate() && ventas[indexTwo].fecha.getMonth() == 11) {
          sumDayTwo = parseFloat(ventas[indexTwo].total) + parseFloat(sumDayTwo)
        }
      }
      if (sumDayTwo == 0) {
        chartdata.datasets[0].data.push('0')
      }else{
        chartdata.datasets[0].data.push(sumDayTwo)
      }

      if (sumDay == 0) {
        chartdata.datasets[1].data.push('0')
      }else{
        chartdata.datasets[1].data.push(sumDay)
      }
    }
    res.json({'chart': chartdata, 'sales': salesArray})
  })

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
  console.log(req.body.fecha)
  let today = ''
  if (req.body.fecha == 'fecha') {
    today = new Date()
  }else{
    console.log('estoy aqui')
    today = new Date(req.body.fecha)
  }
  console.log(req.body.fecha)
  console.log(today)
  const total = req.body.total
  const comision = '0.' + req.body.comision
  const comisionFinal = parseFloat(total) * parseFloat(comision)
  const comisionDosdecimales = comisionFinal.toFixed(2)
  const ganancia = parseFloat(total) * 0.10
  const gananciaLocal = parseFloat(total) * 0.30
  const reinversion = parseFloat(total) * 0.15
  const credito = parseFloat(total) * 0.05
  const venta = {
    cliente: req.body.cliente,
    manicurista: req.body.manicurista,
    servicios: req.body.servicios,
    comision: comisionFinal,
    pago:req.body.mediopago,
    descuento:req.body.descuento,
    ganancianeta: ganancia,
    ganancialocal: gananciaLocal,
    reinversion: reinversion,
    credito: credito,
    total: total,
    fecha: today
  }
  const documentoManicurista = req.body.documentoManicurista
  Venta.create(venta)
  .then(ventas => {
    Manicurista.updateOne({documento:documentoManicurista},{
      $inc: {comision:ventas.comision}
    })
    .then(comision => {
      Cliente.updateOne({nombre: ventas.cliente},{
        $inc: {participacion: 1}
      })
      .then(participacion => {
        VentaDia.create(venta)
        .then(venta => {
          res.json({status: 'Venta registrada'})
        })
        .catch(err => {
          res.send('Error:' + err)
        })
      })
      .catch(err => {
        res.send('Error:' + err)
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

ventas.get('/GetSalesPerMonth', (req, res) => {
  const thisDate = new Date()
  const date = thisDate.getMonth()
  
  let month  = 'month'
  let monthTwo = 'month'
  if (date === 0) {
    month = 'Enero'
    monthTwo = 'Diciembre'
  }else if (date === 1) {
    month = 'Febrero'
    monthTwo = 'Enero'
  }else if (date === 2) {
    month = 'Marzo'
    monthTwo = 'Febrero'
  }else if (date === 3) {
    month = 'Abril'
    monthTwo = 'Marzo'
  }else if (date === 4) {
    month = 'Mayo'
    monthTwo = 'Abril'
  }else if (date === 5) {
    month = 'Junio'
    monthTwo = 'Mayo'
  }else if (date === 6) {
    month = 'Julio'
    monthTwo = 'Junio'
  }else if (date === 7) {
    month = 'Agosto'
    monthTwo = 'Julio'
  }else if (date === 8) {
    month = 'Septiembre'
    monthTwo = 'Agosto'
  }else if (date === 9) {
    month = 'Octubre'
    monthTwo = 'Septiembre'
  }else if (date === 10) {
    month = 'Noviembre'
    monthTwo = 'Octubre'
  }else if (date === 11) {
    month = 'Deciembre'
    monthTwo = 'Noviembre'
  }
  
  let chartdata = {
    labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
    datasets: [ 
      {
        label: monthTwo,
        backgroundColor: '#f4861f',
        data: []
      },
      {
        label: month,
        backgroundColor: '#7c2929',
        data: []
      }
    ]
  }

  Venta.find()
  .then(ventas => {
    for (let indexOne = 0; indexOne < chartdata.labels.length; indexOne++) {
      let datasets = chartdata.labels[indexOne]
      let sumDay = 0
      let sumDayTwo = 0
      for (let index = 0; index < ventas.length; index++) {
        if (datasets === ventas[index].fecha.getDate() && date === ventas[index].fecha.getMonth()) {
          sumDay = parseFloat(ventas[index].total) + parseFloat(sumDay)
        }
      }
      for (let indexTwo = 0; indexTwo < ventas.length; indexTwo++) {
        if (datasets === ventas[indexTwo].fecha.getDate() && date - 1 === ventas[indexTwo].fecha.getMonth()) {
          sumDayTwo = parseFloat(ventas[indexTwo].total) + parseFloat(sumDayTwo)
        }else if (datasets === ventas[indexTwo].fecha.getDate() && ventas[indexTwo].fecha.getMonth() == 11) {
          sumDayTwo = parseFloat(ventas[indexTwo].total) + parseFloat(sumDayTwo)
        }
      }
      if (sumDayTwo == 0) {
        chartdata.datasets[0].data.push('0')
      }else{
        chartdata.datasets[0].data.push(sumDayTwo)
      }

      if (sumDay == 0) {
        chartdata.datasets[1].data.push('0')
      }else{
        chartdata.datasets[1].data.push(sumDay)
      }
    }
    res.json(chartdata)
  })
  


})


module.exports = ventas

