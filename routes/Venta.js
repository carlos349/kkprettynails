const express = require('express')
const ventas = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const protectRoute = require('../accessFunctions/verifyToken')
const User = require('../models/User')

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
const cashFunds = require('../models/cashFund')
const Citas = require('../models/Citas')
const closedDates = require('../models/closedDates')
const Expenses = require('../models/Expenses')
const GetWeeks = require('../models/getWeek')
ventas.use(cors())

ventas.post('/generateDataExcel', (req, res) => {
  var Client = req.body.clientSelect
  if (Client) {
    const splitClient = req.body.clientSelect.split(' / ')
    Client = splitClient[1]
  }
  
  const data = {
    rangeExcel: req.body.rangeExcel, 
    lenderSelect: req.body.lenderSelect, 
    clientSelect: Client,
    firstDate: '', 
    lastDate: ''
  }
  if (data.rangeExcel.length > 14 ) {
    const split = data.rangeExcel.split(' a ')
    data.firstDate = split[0]
    const DateUsage = new Date(split[1])
    DateUsage.setDate(DateUsage.getDate() + 1)
    data.lastDate = (DateUsage.getMonth() + 1)+"-"+DateUsage.getDate()+"-"+DateUsage.getFullYear()
  }else{
    const split = data.rangeExcel.split(':')
    const DateUsage = new Date(split[0])
    data.firstDate = split[0]
    DateUsage.setDate(DateUsage.getDate() + 1)
    data.lastDate = (DateUsage.getMonth() + 1)+"-"+DateUsage.getDate()+"-"+DateUsage.getFullYear()
  }

  var dataTable = []
  if (data.clientSelect == '' && data.lenderSelect == '' ) {
    Venta.find({
      $and: [
        {fecha: {$gte: data.firstDate, $lte: data.lastDate}},
        {status:true}
      ]
    })
    .then(sales => {
      if(sales.length > 0){
        console.log(sales)
        for (let index = 0; index < sales.length; index++) {
          const element = sales[index];
          var services = ''
          for (let indexTwo = 0; indexTwo < element.servicios.length; indexTwo++) {
            const elementTwo = element.servicios[indexTwo];
            if (indexTwo == 0) {
              services = elementTwo.servicio
            }else{
              services = services + ',' + elementTwo.servicio
            }
          }
          var Lenders = ''
          for (let indexThree = 0; indexThree < element.EmployeComision.length; indexThree++) {
            const elementThree = element.EmployeComision[indexThree];
            if (indexThree == 0) {
              Lenders = elementThree.employe
            }else{
              Lenders = Lenders + ',' + elementThree.employe
            }
          }
          if(element.EmployeComision.length > 1){
            const client = element.cliente.split(' - ')
            const discount = element.descuento.split(' - ')
            var clients = ''
            var discounts = ''
            for (let indexFour = 0; indexFour < client.length; indexFour++) {
              const clientFinal = client[indexFour].split(' / ')
              const discountFinal = discount[indexFour].split(' / ')
              if (indexFour == 0) {
                clients = clientFinal[0]
                discounts = discountFinal[1]
              }else{
                clients = clients+ ' , ' +clientFinal[0]
                discounts = discounts+ ' , ' +discountFinal[1]
              } 
            }
          }else{
            discounts = element.descuento
            const client = element.cliente.split(' / ')
            var clients = client[0]
          }
          const formatDate = element.fecha.getDate()+"-"+(element.fecha.getMonth() + 1)+"-"+element.fecha.getFullYear()
          dataTable.push({'id de ventas': 'V-'+element.count, Fecha: formatDate, Prestador: Lenders, Cliente: clients, servicios: services, Descuento: discounts+'%', Diseño: element.design, Comision: element.comision, 'Ganancia local': element.ganancialocal, Total: element.total, Efectivo: element.pagoEfectivo, 'Débito': element.pagoRedCDebito, 'Crédito':  element.pagoRedCCredito, Tranferencia: element.pagoTransf, Otros: element.pagoOtros })
        }
        res.json({status: 'ok', dataTable: dataTable})
      }else{
        res.json({status: 'bad'})
      }
    }).catch(err => {
      res.send(err)
      console.log(err)
    })
  }else{
    if(data.clientSelect == '' || data.clientSelect == null){
      Venta.find({
        $and: [
          {fecha: {$gte: data.firstDate, $lte: data.lastDate}},
          {manicurista: { $regex: data.lenderSelect, $options: 'i'}},
          {status:true}
        ]
      })
      .then(sales => {
        if(sales.length > 0){
          for (let index = 0; index < sales.length; index++) {
            const element = sales[index];
            var services = ''
            for (let indexTwo = 0; indexTwo < element.servicios.length; indexTwo++) {
              const elementTwo = element.servicios[indexTwo];
              if (indexTwo == 0) {
                services = elementTwo.servicio
              }else{
                services = services + ',' + elementTwo.servicio
              }
            }
            var Lenders = ''
            for (let indexThree = 0; indexThree < element.EmployeComision.length; indexThree++) {
              const elementThree = element.EmployeComision[indexThree];
              if (indexThree == 0) {
                Lenders = elementThree.employe
              }else{
                Lenders = Lenders + ',' + elementThree.employe
              }
            }
            if(element.EmployeComision.length > 1){
              const client = element.cliente.split(' - ')
              const discount = element.descuento.split(' - ')
              var clients = ''
              var discounts = ''
              for (let indexFour = 0; indexFour < client.length; indexFour++) {
                const clientFinal = client[indexFour].split(' / ')
                const discountFinal = discount[indexFour].split(' / ')
                if (indexFour == 0) {
                  clients = clientFinal[0]
                  discounts = discountFinal[1]
                }else{
                  clients = clients+ ' , ' +clientFinal[0]
                  discounts = discounts+ ' , ' +discountFinal[1]
                } 
              }
            }else{
              discounts = element.descuento
              const client = element.cliente.split(' / ')
              var clients = client[0]
            }
            const formatDate = (element.fecha.getMonth() + 1)+"-"+element.fecha.getDate()+"-"+element.fecha.getFullYear()
            dataTable.push({'id de ventas': 'V-'+element.count, Fecha: formatDate, Prestador: Lenders, Cliente: clients, servicios: services, Descuento: discounts+'%', Comision: element.comision, 'Ganancia local': element.ganancialocal, Total: element.total, Efectivo: element.pagoEfectivo, 'Débito': element.pagoRedCDebito, 'Crédito':  element.pagoRedCCredito, Tranferencia: element.pagoTransf, Otros: element.pagoOtros })
          }
          res.json({status: 'ok', dataTable: dataTable})
        }else{
          res.json({status: 'bad'})
        }
      }).catch(err => {
        res.send(err)
        console.log(err)
      })
    }else if (data.lenderSelect == '' || data.lenderSelect == null) {
      Venta.find({
        $and: [
          {fecha: {$gte: data.firstDate, $lte: data.lastDate}},
          {cliente: { $regex: data.clientSelect, $options: 'i'}},
          {status:true}
        ]
      })
      .then(sales => {
        if(sales.length > 0){
          for (let index = 0; index < sales.length; index++) {
            const element = sales[index];
            var services = ''
            for (let indexTwo = 0; indexTwo < element.servicios.length; indexTwo++) {
              const elementTwo = element.servicios[indexTwo];
              if (indexTwo == 0) {
                services = elementTwo.servicio
              }else{
                services = services + ',' + elementTwo.servicio
              }
            }
            var Lenders = ''
            for (let indexThree = 0; indexThree < element.EmployeComision.length; indexThree++) {
              const elementThree = element.EmployeComision[indexThree];
              if (indexThree == 0) {
                Lenders = elementThree.employe
              }else{
                Lenders = Lenders + ',' + elementThree.employe
              }
            }
            if(element.EmployeComision.length > 1){
              const client = element.cliente.split(' - ')
              const discount = element.descuento.split(' - ')
              var clients = ''
              var discounts = ''
              for (let indexFour = 0; indexFour < client.length; indexFour++) {
                const clientFinal = client[indexFour].split(' / ')
                const discountFinal = discount[indexFour].split(' / ')
                if (indexFour == 0) {
                  clients = clientFinal[0]
                  discounts = discountFinal[1]
                }else{
                  clients = clients+ ' , ' +clientFinal[0]
                  discounts = discounts+ ' , ' +discountFinal[1]
                } 
              }
            }else{
              discounts = element.descuento
              const client = element.cliente.split(' / ')
              var clients = client[0]
            }
            const formatDate = (element.fecha.getMonth() + 1)+"-"+element.fecha.getDate()+"-"+element.fecha.getFullYear()
            dataTable.push({'id de ventas': 'V-'+element.count, Fecha: formatDate, Prestador: Lenders, Cliente: clients, servicios: services, Descuento: discounts+'%', Comision: element.comision, 'Ganancia local': element.ganancialocal, Total: element.total, Efectivo: element.pagoEfectivo, 'Débito': element.pagoRedCDebito, 'Crédito':  element.pagoRedCCredito, Tranferencia: element.pagoTransf, Otros: element.pagoOtros })
          }
          res.json({status: 'ok', dataTable: dataTable})
        }else{
          res.json({status: 'bad'})
        }
      }).catch(err => {
        res.send(err)
        console.log(err)
      })
    }
  }
  
})
// {servicios: 1, employeComision: 1, cliente: 1, manicurista: 1, comision: 1, pagoEfectivo: 1, pagoOtros: 1, pagoRedCDebito: 1, pagoRedCCredito: 1, }

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
      registro:{
        tipo:'servicio',
        nombre:services,
        cantidad:1
      }
  }

  mes.findOne({
    $and:[
      {'registro.tipo':'servicio'},
      {'registro.nombre':services}
    ]
  })
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
      mes.updateOne({
        $and:[
          {'registro.tipo':'servicio'},
          {'registro.nombre':services}
        ]
      },{$inc:{'registro.cantidad':1}})
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

ventas.get('/getSale/:id', async (req, res, next) => {
  const sale = await Venta.findById(req.params.id)
  res.json(sale)
})

ventas.get('/findSalesByDate/:dates', async (req, res) => {
  const dates = req.params.dates
  const splitDates = dates.split(':')
  const desde = splitDates[0]
  const hasta = new Date(splitDates[1] + ' 10:00') 
  hasta.setDate(hasta.getDate() + 1)
  const goodHasta =  (hasta.getMonth() + 1)+"-"+hasta.getDate()+"-"+hasta.getFullYear()
  
  try {
    const Sales = await Venta.find({fecha: { $gte: desde, $lte: goodHasta }})
    
    if (Sales.length == 0) {
      res.json({status: 'no Sales'})
    }else{
      res.json({status: Sales})
    }
  } catch(err) {
    res.send(err)
  }
 
})

ventas.get('/findSalesByDay/:dates', async (req, res) => {
  const dates = req.params.dates
  const splitDates = dates.split(':')
  const desde = splitDates[0]
  const hasta = splitDates[1] 
  
  
  try {
    const Sales = await Venta.find({fecha: { $gte: desde, $lte: hasta }})

    if (Sales.length == 0) {
      res.json({status: 'no Sales'})
    }else{
      res.json({status: Sales})
    }
  } catch(err) {
    res.send(err)
  }
 
})

ventas.get('/closingPerMonth', (req, res) => {
  Cierres.find()
  .then(cierres => {
    res.json(cierres)
  })
  .catch(err => {
    res.send(err)
  })
})

ventas.get('/Closing', (req, res) => {
  Cierres.find().sort({fecha:-1})
  .then(cierres => {

    res.json(cierres)
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
  

  var data = {
    efectivo: 0,
    redCompraDebito: 0,
    redCompraCredito: 0,
    transferencia: 0,
    otros: 0,
    total: 0
  }
  
  VentaDia.find()
  .then(ventas => {
    if (ventas.length > 0) {
      for (let index = 0; index < ventas.length; index++) {
        if (ventas[index].pagoEfectivo > 0) {
          data.efectivo = data.efectivo + ventas[index].pagoEfectivo
        }
        if (ventas[index].pagoRedCDebito > 0) {
          data.redCompraDebito = data.redCompraDebito + ventas[index].pagoRedCDebito
        }
        if (ventas[index].pagoRedCCredito > 0) {
          data.redCompraCredito = data.redCompraCredito + ventas[index].pagoRedCCredito
        }
        if (ventas[index].pagoOtros > 0) {
          data.otros = data.otros + ventas[index].pagoOtros
        }
        if (ventas[index].pagoTransf > 0) {
          data.transferencia = data.transferencia + ventas[index].pagoTransf
        }
      } 
      data.total = data.efectivo + data.redCompraDebito + data.redCompraCredito + data.otros + data.transferencia
      console.log(data.total)
      res.json(data)
    }else{
      res.json({status: 'bad'})
    }
  })
  .catch(err => {
    res.send(err )
  })
})

ventas.get('/totalSales/:month', async (req, res) => {
  var totalLocal = 0
  var gananciaNeta = 0
  var gananciaTotal = 0
  var localAnterior = 0
  var netaAnterior = 0
  var totalAnterior = 0
  var totalComision = 0
  var totalComisionAnterior = 0

  const dateNow = new Date()
  const formatDate = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+'-1'
  const formatDateTwo = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-31"
  var formatDatePrev, formatDateTwoPrev
  if (dateNow.getMonth() == 0) {
    formatDatePrev = dateNow.getFullYear() +"-12-1"
    formatDateTwoPrev = dateNow.getFullYear() +"-12-31"
  }else{
    formatDatePrev = dateNow.getFullYear() +"-"+dateNow.getMonth()+'-1'
    formatDateTwoPrev = dateNow.getFullYear() +"-"+dateNow.getMonth()+"-31"
  }
  Venta.find({
    $and: [
      {
        fecha: { $gte: formatDate, $lte: formatDateTwo }
      },
      {
        status: true
      }
    ]   
  })
  .then(SalesMonth => {
    for (let index = 0; index < SalesMonth.length; index++) {
      totalLocal = totalLocal + SalesMonth[index].ganancialocal 
      gananciaTotal = gananciaTotal + SalesMonth[index].total
      totalComision = totalComision + SalesMonth[index].comision
    }
    gananciaNeta = totalLocal * 0.10
    Venta.find({
      $and: [
        {
          fecha: { $gte: formatDatePrev, $lte: formatDateTwoPrev }
        },
        {
          status: true
        }
      ]   
    }).then(SalesMonthPrev => {
      
      for (let indexTwo = 0; indexTwo < SalesMonthPrev.length; indexTwo++) {
        localAnterior = localAnterior + SalesMonthPrev[indexTwo].ganancialocal 
        totalAnterior = totalAnterior + SalesMonthPrev[indexTwo].total
        totalComisionAnterior = totalComisionAnterior + SalesMonthPrev[indexTwo].comision
        
      }
      netaAnterior = localAnterior * 0.10
      
      res.json({totalLocal: totalLocal, gananciaNeta: gananciaNeta, gananciaTotal: gananciaTotal, localAnterior: localAnterior, netaAnterior: netaAnterior, totalAnterior: totalAnterior, comision:totalComision, comisionAnterior:totalComisionAnterior })
    })
    .catch(err => {
      res.send(err)
    })
  })
  .catch(err => {
    res.send(err)
  })

})

ventas.get('/getFund', async (req, res) => {
  try{
    const idFunds = await cashFunds.find()
   
    if (idFunds.length > 0) {
      res.status(200).json({status: 'ok', fondos:idFunds})
    }else{
      res.status(200).json({status: 'bad'})
    } 
  }catch(err){
    res.send(err)
  }
  
})

ventas.post('/closeDay/:name', async (req, res) => {
  const closeName = req.params.name
  const dateNow = new Date()
  const formatDate = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()

  dateNow.setDate(dateNow.getDate() + 1)
  const formatDateTwo = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()
  const dateTomorrow = new Date(formatDateTwo)
  
  const CloseDay = {
    manual: {
      ingresoFondo: req.body.fondoManual,
      efectivo: req.body.efectivoManual,
      egreso: req.body.egresoManual,
      totalEfectivo: req.body.totalEfectivoManual,
      debito: req.body.redCompreDManual,
      credito: req.body.redCompreCManual,
      transferencia: req.body.transferenciaManual, 
      otros: req.body.otrosManual,
      total: req.body.totalManual
    },
    sistema: {
      ingresoFondo: req.body.fondoSistema,
      efectivo: req.body.efectivoSistema,
      egreso: req.body.egresoSistema,
      totalEfectivo: req.body.totalEfectivoSistema,
      debito: req.body.redCompraDebitoSistema,
      credito: req.body.redCompraCreditoSistema,
      transferencia: req.body.transferenciaSistema, 
      otros: req.body.otrosSistema,
      total: req.body.totalSistema
    },
    identificacionCierre: closeName,
    fecha: new Date()
  }

  const closed = await Cierres.create(CloseDay)
  if (closed) {
    const removeSales = await VentaDia.deleteMany({})
    if (removeSales) {
      const idFunds = await cashFunds.find()
      if (idFunds) {
        const reloadFunds = await cashFunds.findByIdAndUpdate(idFunds[0]._id, {
          $set: {
            userRegister: '',
            amount: 0, 
            amountEgress: 0,
            validator: false
          }
        })
        if (reloadFunds) {
          res.json({status: 'ok'})
        }
        res.json({status: 'bad'})
      }
      res.json({status: 'bad'})
    }
    res.json({status: 'bad'})
  }
  res.json({status: 'bad'})
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
        backgroundColor: 'rgba(31, 86, 115, .8)',
        data: []
      },
      {
        label: month,
        backgroundColor: 'rgba(14, 48, 66, .8)',
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
    registro:{
      tipo:'servicio',
      nombre:services,
      cantidad:1
    }
  } 

  mes.findOne({
    $and:[
      {'registro.tipo':'servicio'},
      {'registro.nombre':services}
    ]
  })
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
      mes.updateOne({
        $and:[
          {'registro.tipo':'servicio'},
          {'registro.nombre':services}
        ]
      },{$inc:{'registro.cantidad':-1}})
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
})

ventas.put('/updateProviderMonth/:provider', (req, res) => {
  const thisDate = new Date()
  const date = thisDate.getMonth()
  const provider = req.params.provider
  
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

  const createProvider = {
    registro:{
      tipo:'Prestador',
      nombre:provider,
      cantidad:1
    }
  } 

  mes.findOne({
    $and:[
      {'registro.tipo':'Prestador'},
      {'registro.nombre':provider}
    ]
  })
  .then(back => {
    if(!back){
      mes.create(createProvider)
      .then(back => {
        res.json({'status':'ok'})
      })
      .catch(err => {
        res.send('error: ' + err)
      })
    }else{
      mes.updateOne({
        $and:[
          {'registro.tipo':'Prestador'},
          {'registro.nombre':provider}
        ]
      },{$inc:{'registro.cantidad':1}})
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
})

ventas.put('/updateProviderMonthDiscount/:provider', (req, res) => {
  const thisDate = new Date()
  const date = thisDate.getMonth()
  const provider = req.params.provider
  
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

  const createProvider = {
    registro:{
      tipo:'Prestador',
      nombre:provider,
      cantidad:1
    }
  } 

  mes.findOne({
    $and:[
      {'registro.tipo':'Prestador'},
      {'registro.nombre':provider}
    ]
  })
  .then(back => {
    if(!back){
      mes.create(createProvider)
      .then(back => {
        res.json({'status':'ok'})
      })
      .catch(err => {
        res.send('error: ' + err)
      })
    }else{
      mes.updateOne({
        $and:[
          {'registro.tipo':'Prestador'},
          {'registro.nombre':provider}
        ]
      },{$inc:{'registro.cantidad':-1}})
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
})

ventas.post('/ingresocliente', (req, res) => {
  const today = new Date()
  const ClienteData = {
    nombre: req.body.nombre,
    identidad: req.body.identidad,
    participacion: 0,
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

ventas.get('/', protectRoute, async (req, res) => {
  const dateformat = new Date()
  const dateFirst = dateformat.getFullYear() +"-"+(dateformat.getMonth() + 1)+"-1"
  const dateLast = dateformat.getFullYear() +"-"+(dateformat.getMonth() + 1)+"-31"
  const ventas = await Venta.find({fecha: {$gte: dateFirst, $lte: dateLast}}).sort({count: -1})
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

ventas.put('/:id', async (req, res, next) => {
    const id = req.params.id
    const dataComision = req.body.employeComision
    const cancelSale = await Venta.findByIdAndUpdate(id, {
      $set: { status: false}
    })
    if (cancelSale) {
      const removeSale = await VentaDia.findOneAndRemove({idTableSales: id})
      for (let index = 0; index < dataComision.length; index++) {
        var comisionNega = '-'+dataComision[index].comision
        var removeComision = await Manicurista.updateOne({nombre:dataComision[index].employe},{$inc: {comision: parseFloat(comisionNega)}})
      }
      res.status(200).json({status: 'ok'})
    }
    res.json({status: 'bad'})
})

ventas.post('/processEndDates', (req, res) => {
  cashFunds.find()
  .then(have => {
    if (have.length > 0) {
      if (have[0].validator) {
        Venta.find().sort({count: -1}).limit(1)
          .then(countSale =>{
            var count = countSale[0].count + 1
            for (let i = 0; i < req.body.arrayClosedDates.length; i++) {
                const element = req.body.arrayClosedDates[i];
                var dataSales = {
                  cliente: element.client,
                  manicurista: element.employe,
                  servicios: element.services,
                  comision: element.comision,
                  EmployeComision: [{employe:element.employe, comision:element.comision}],
                  pagoEfectivo:element.payCash,
                  pagoOtros:element.payOthers,
                  pagoRedCDebito:element.payDebit,
                  pagoRedCCredito:element.payCredit,
                  pagoTransf:element.payTransfer,
                  pagoOrder:element.payOrder,
                  descuento:element.descuento,
                  ganancialocal: element.totalLocal,
                  design: element.design,
                  count: count+i,
                  status: true,
                  total: element.total,
                  fecha: new Date()
                }
                Venta.create(dataSales)
                .then(sales=>{})
                closedDates.findByIdAndRemove(element.id)
                .then(ready =>{})
                Cliente.updateOne({identidad: element.client.split(" / ")[1]},{
                  $inc: {participacion: 1},
                  $set: {ultimaFecha: dataSales.fecha},
                  $push: {historical: dataSales}
                })
                .then(clients =>{})
                Manicurista.updateOne({nombre:element.employe},{
                  $inc: {comision:element.comision}
                }) 
                .then(clients =>{}) 
              }
              setTimeout(() => {
                Venta.find().sort({count: -1}).limit(req.body.arrayClosedDates.length)
                .then(forDay =>{

                  for (let index = 0; index < forDay.length; index++) {
                    const element = forDay[index];
                    var dataDay = {
                      cliente: element.cliente,
                      manicurista: element.manicurista,
                      servicios: element.servicios,
                      comision: element.comision,
                      pagoEfectivo:element.pagoEfectivo,
                      pagoOtros:element.pagoOtros,
                      pagoRedCDebito:element.pagoRedCDebito,
                      pagoRedCCredito:element.pagoRedCCredito,
                      pagoTransf:element.pagoTransf,
                      pagoOrder:element.pagoOrder,
                      descuento:element.descuento,
                      ganancialocal: element.ganancialocal,
                      design: element.design,
                      status: true,
                      total: element.total,
                      idTableSales: element._id,
                      fecha: new Date()
                    }
                    VentaDia.create(dataDay)
                    .then(ventaDia =>{
                    })
                  }
                  
                  
                })
              }, 5000);
              
              
              res.json({status:'Venta registrada'})
          })
      }
      else{
        res.json({status:'no-cash'})
      }
    }else{
      cashFunds.create({
        userRegister:'',
        amount:0,
        amountEgress:0,
        quantity:0,
        validator: false
      }).then(createCash => {
        res.json({status: 'no-cash'})
      })
    }
  })

})

ventas.post('/procesar', (req, res) => {
  const ifProcess = req.body.ifProcess
  const services = req.body.servicios
  let clientEdit = req.body.cliente
  let finalClient = ''
  if (clientEdit.includes(" / ")) {
    finalClient = clientEdit.split(" / ")[1]
  }
  else{
    finalClient = clientEdit
  }
  console.log("este")
  console.log(clientEdit)
  var today
  if (req.body.processDate) {
    today = new Date(req.body.fecha+ ' 10:00')
  }else{
    const dateformat = new Date(req.body.fecha)
    const dateDailyToday = dateformat.getFullYear() +"-"+(dateformat.getMonth() + 1)+"-"+dateformat.getDate()
    today = new Date(dateDailyToday+ ' 10:00')
  }
  var descuento = 100 - req.body.descuento
  var comisionTotal = 0
  for (let index = 0; index < services.length; index++) {
    let comisionPerAmount = 0
    let comisionDescuento = 0
    if (services[index].descuento) {
        comisionDescuento = parseFloat(services[index].precio)
    }else{ 
      if (descuento == 100) {
        comisionDescuento = parseFloat(services[index].precio)
      }else{
        comisionDescuento = parseFloat(services[index].precio) * parseFloat('0.'+descuento)
      }
    }
    comisionPerAmount = comisionDescuento * parseFloat('0.'+req.body.servicios[index].comision)
    comisionTotal = comisionTotal + comisionPerAmount
  }

  const total = req.body.total
  const totalComisionDesign = parseFloat(req.body.diseno) * 0.50
  const comision = parseFloat(comisionTotal) + parseFloat(totalComisionDesign)
  console.log(total  +"maaas" + comision)
  const gananciaTotal = total - parseFloat(comision) 
  const documentoManicurista = req.body.documentoManicurista

  var discount
  if (descuento == 100) {
    discount = '0'
  }else{
    discount = req.body.descuento
  }
  const venta = {
    cliente: req.body.cliente,
    manicurista: req.body.manicurista,
    servicios: req.body.servicios,
    comision: comision,
    EmployeComision: [{employe: req.body.manicurista, comision: comision}],
    pagoEfectivo:req.body.pagoEfectivo,
    pagoOtros:req.body.pagoOtros,
    pagoRedCDebito:req.body.pagoRedCDebito,
    pagoRedCCredito:req.body.pagoRedCCredito,
    pagoTransf:req.body.pagoTransf,
    pagoOrder:req.body.pagoOrder,
    descuento:discount,
    ganancialocal: gananciaTotal,
    design: req.body.diseno,
    count: 0,
    status: true,
    total: total,
    fecha: today
  }
  
  const ventaDia = {
    cliente: req.body.cliente,
    manicurista: req.body.manicurista,
    servicios: req.body.servicios,
    comision: comision,
    pagoEfectivo:req.body.pagoEfectivo,
    pagoOtros:req.body.pagoOtros,
    pagoRedCDebito:req.body.pagoRedCDebito,
    pagoRedCCredito:req.body.pagoRedCCredito,
    pagoTransf:req.body.pagoTransf,
    pagoOrder:req.body.pagoOrder,
    descuento:req.body.descuento,
    ganancialocal: gananciaTotal,
    design: req.body.diseno,
    status: true,
    total: total,
    idTableSales: '',
    fecha: today
  }
  var ifrecomend = 0
  if (req.body.ifrecomend) {
    ifrecomend = 1
  }
  
  cashFunds.find()
  .then(have => {
    if (have.length > 0) {
      if (have[0].validator) {
        Venta.find()
        .then(ifCount => {
          if (ifCount.length > 0) {
            Venta.find().sort({count: -1}).limit(1)
            .then(Count => {
              venta.count = parseFloat(Count[0].count) + 1
              Venta.create(venta)
              .then(ventas => {
                ventaDia.idTableSales = ventas._id
                Manicurista.findByIdAndUpdate(documentoManicurista,{
                  $inc: {comision:ventas.comision}
                })
                .then(comision => {
                  Cliente.updateOne({identidad: finalClient},{
                    $inc: {participacion: 1},
                    $set: {ultimaFecha: today},
                    $push: {historical: ventaDia}
                  })
                  .then(lasDate => {
                    VentaDia.create(ventaDia)
                    .then(venta => {
                      Cliente.findByIdAndUpdate()
                      if (ifProcess != '') {
                        Citas.findByIdAndUpdate(ifProcess, {
                          $set: {
                            process: false
                          }
                        })
                        .then(process => {
                          Cliente.findOne({identidad: finalClient})
                          .then(reco => {
                            
                            if (req.body.descuento == 10) {
                              if (reco.idRecomendador && reco.idRecomendador != '') {
                                Cliente.findByIdAndUpdate(reco.idRecomendador, {
                                  $inc : {recomendaciones:1}
                                })
                                .then(inc =>{
                                  Cliente.updateOne({identidad: finalClient}, {
                                    $set : {idRecomendador:''}
                                  })
                                  .then(set =>{
                                    res.json({status: 'Venta registrada'})
                                  })
                                })
                              }
                              else{
                                res.json({status: 'Venta registrada'})
                              }
                            }else{
                              res.json({status: 'Venta registrada'})
                            }
                          })
                        })
                        .catch(err => {
                          res.send('Error:' + err)
                        })
                      }else{
                        console.log(finalClient)
                        Cliente.findOne({identidad: finalClient})
                          .then(reco => {
                            console.log(reco)
                            if (req.body.descuento == 10) {
                              if (reco.idRecomendador && reco.idRecomendador != '') {
                                Cliente.findByIdAndUpdate(reco.idRecomendador, {
                                  $inc : {recomendaciones:1}
                                })
                                .then(inc =>{
                                  Cliente.updateOne({identidad: finalClient}, {
                                    $set : {idRecomendador:''}
                                  })
                                  .then(set =>{
                                    res.json({status: 'Venta registrada'})
                                  })
                                })
                              }
                              else{
                                res.json({status: 'Venta registrada'})
                              }
                            }else{
                              res.json({status: 'Venta registrada'})
                            }
                          })
                      }
                    })
                    .catch(err => {
                      res.send('Error:' + err)
                    })
                  })
                  .catch(err => {
                    res.send(err)
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
          }else{
            venta.count = 1
            Venta.create(venta)
            .then(ventas => {
              ventaDia.idTableSales = ventas._id
              Manicurista.updateOne({documento:documentoManicurista},{
                $inc: {comision:ventas.comision}
              })
              .then(comision => {
                Cliente.updateOne({identidad: finalClient},{
                  $inc: {participacion: 1},
                  $set: {ultimaFecha: today},
                  $push: {historical: ventaDia}
                })
                .then(lasDate => {
                  VentaDia.create(ventaDia)
                  .then(venta => {
                    if (ifProcess != '') {
                      Citas.findByIdAndUpdate(ifProcess, {
                        $set: {
                          process: false
                        }
                      })
                      .then(process => {
                        
                        res.json({status: 'Venta registrada'})
                      })
                      .catch(err => {
                        res.send('Error:' + err)
                      })
                    }else{
                      res.json({status: 'Venta registrada'})
                    }
                  })
                  .catch(err => {
                    res.send('Error:' + err)
                  })
                })
                .catch(err => {
                  res.send(err)
                })
              })
              .catch(err => {
                res.send('Error:' + err)
              })
            })
            .catch(err => {
              res.send('Error: ' + err)
            })
          }
        })
      }else{
        res.json({status: 'no-cash'})
      }
    }else{
      cashFunds.create({
        userRegister:'',
        amount:0,
        amountEgress:0,
        quantity:0,
        validator: false
      }).then(createCash => {
        res.json({status: 'no-cash'})
      })
    }
  })
})

ventas.get('/dataChecker', (req, res) => {
  const dateDaily = new Date()
  const dateDailyToday = dateDaily.getFullYear() +"-"+(dateDaily.getMonth() + 1)+"-"+dateDaily.getDate()

  dateDaily.setDate(dateDaily.getDate() + 1)
  const dailyTomorrow = dateDaily.getFullYear() +"-"+(dateDaily.getMonth() + 1)+"-"+dateDaily.getDate()
  Venta.find({
    $and: 
      [
        {fecha: { $gte: dateDailyToday, $lte: dailyTomorrow }},
        {status: true}
      ]
  })
  .then(dataSales => {
    res.json(dataSales)
  })
  .catch(err => {
    res.send(err)
  })
})

ventas.post('/dataSectionManagement', (req, res) => {
  const dateDaily = new Date(req.body.dateDaily)
  const dateDailyTwo = new Date(req.body.dateDaily)
  
  const dateDailyToday = dateDaily.getFullYear() +"-"+(dateDaily.getMonth() + 1)+"-"+dateDaily.getDate()

  dateDaily.setDate(dateDaily.getDate() + 1)
  const dailyTomorrow = dateDaily.getFullYear() +"-"+(dateDaily.getMonth() + 1)+"-"+dateDaily.getDate()
  
  const dateWeekly = new Date()
  const dateWeeklyUntil = dateWeekly.getFullYear() +"-"+(dateWeekly.getMonth() + 1)+"-"+(dateWeekly.getDate() + 1)
  dateWeekly.setDate(dateDaily.getDate() - dateDaily.getDay())
  const dateWeeklySince = dateWeekly.getFullYear() +"-"+(dateWeekly.getMonth() + 1)+"-"+dateWeekly.getDate()
 
  const dateMonthly = new Date((dateDailyTwo.getMonth() + 1)+'-01-'+dateDailyTwo.getFullYear())
  const dateMonthlySince = dateMonthly.getFullYear() +"-"+(dateMonthly.getMonth() + 1)+"-"+(dateMonthly.getDate() + 1)
  dateMonthly.setMonth(dateMonthly.getMonth() + 1)
  const dateMonthlyUntil = dateMonthly.getFullYear() +"-"+(dateMonthly.getMonth() + 1)+"-"+dateMonthly.getDate()
  
  var dailyData = {
    Sale: 0,
    Services: 0,
    Expenses: 0
  }
  var weeklyData = {
    Sale: 0,
    Services: 0,
    Expenses: 0
  }
  var monthlyData = {
    Sale: 0,
    Services: 0,
    Expenses: 0
  }

  Venta.find({fecha: { $gte: dateDailyToday, $lte: dailyTomorrow }})
  .then(Sales => {
    for (let index = 0; index < Sales.length; index++) {
      if(Sales[index].status){
        dailyData.Sale = dailyData.Sale + Sales[index].total
        dailyData.Services = dailyData.Services + Sales[index].servicios.length
      }
    }
    Expenses.find({date: { $gte: dateDailyToday, $lte: dailyTomorrow }})
    .then(Dailyexpense => {
      for (let indexTwo = 0; indexTwo < Dailyexpense.length; indexTwo++) {
        dailyData.Expenses = dailyData.Expenses + Dailyexpense[indexTwo].figure
      }
      Venta.find({fecha: { $gte: dateWeeklySince, $lte: dateWeeklyUntil}})
      .then(weeklySales => {
        for (let indexThree = 0; indexThree < weeklySales.length; indexThree++) {
          if(weeklySales[indexThree].status){
            weeklyData.Sale = weeklyData.Sale + weeklySales[indexThree].total
            weeklyData.Services = weeklyData.Services + weeklySales[indexThree].servicios.length
          }
        }
        Expenses.find({date: { $gte: dateWeeklySince, $lte: dateWeeklyUntil }})
        .then(weeklyExpense => {
          for (let indexFour = 0; indexFour < weeklyExpense.length; indexFour++) {
            weeklyData.Expenses = weeklyData.Expenses + weeklyExpense[indexFour].figure
          }
          Venta.find({fecha: { $gte: dateMonthlySince, $lte: dateMonthlyUntil}})
          .then(monthlySales => {
            for (let indexFive = 0; indexFive < monthlySales.length; indexFive++) {
              if(monthlySales[indexFive].status){
                monthlyData.Sale = monthlyData.Sale + monthlySales[indexFive].total
                monthlyData.Services = monthlyData.Services + monthlySales[indexFive].servicios.length
              }
            }
            Expenses.find({date: { $gte: dateMonthlySince, $lte: dateMonthlyUntil }})
            .then(monthlyExpense => {
              for (let indexSix = 0; indexSix < monthlyExpense.length; indexSix++) {
                monthlyData.Expenses = monthlyData.Expenses + monthlyExpense[indexSix].figure
              }
              res.json({Daily: dailyData, Weekly: weeklyData, Monthly: monthlyData})
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
    .catch(err => {
      res.send(err)
    })
  })
  .catch(err => {
    res.send(err)
  })
  
})

ventas.post('/registerFund', async (req, res) => {
  const find = await cashFunds.find()
  if (find.length > 0) {
    const register = await cashFunds.findByIdAndUpdate(find[0]._id, {
      $set: {
        userRegister: req.body.userRegister,
        amount: req.body.amount,
        amountEgress: 0,
        validator: true
      }
    })
    if (register) {
      res.status(200).json({status: 'ok'})
    }
    res.json({status: 'bad'})
  }else{
    const createData = await cashFunds.create({
      userRegister: req.body.userRegister,
      amount: req.body.amount,
      amountEgress: 0,
      quantity: 0,
      validator: true
    })
    res.json({status: 'bad'})
  }
})

ventas.get('/GetSalesPerMonth', (req, res) => {
  const thisDate = new Date()
  const date = thisDate.getMonth()
  
  let chartdata = {
    categories: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
    series: [ 
      {
        name: 'Gastos',
        data: [],
      },
      {
        name: 'Ganancia local' ,
        data: [],
      },
      {
        name: 'Total ventas' ,
        data: [],
      }
    ]
  }

  Venta.find()
  .then(ventas => {
    for (let indexOne = 0; indexOne < chartdata.categories.length; indexOne++) {
      let datasets = chartdata.categories[indexOne]
      let sumDay = 0
      let sumDayTwo = 0
      for (let index = 0; index < ventas.length; index++) {
        if (datasets === ventas[index].fecha.getDate() && date === ventas[index].fecha.getMonth()) {
          if (ventas[index].status) {
            sumDay = parseFloat(ventas[index].total) + parseFloat(sumDay)
            sumDayTwo = parseFloat(ventas[index].ganancialocal) + parseFloat(sumDayTwo)
          }
        }
      }
      
      if (sumDayTwo == 0) {
        chartdata.series[1].data.push('0')
      }else{
        chartdata.series[1].data.push(sumDayTwo)
      }

      if (sumDay == 0) {
        chartdata.series[2].data.push('0')
      }else{
        chartdata.series[2].data.push(sumDay)
      }
    }
    Expenses.find()
    .then(expense => {
      for (let indexOne = 0; indexOne < chartdata.categories.length; indexOne++) {
        let datasets = chartdata.categories[indexOne]
        let sumDayThree = 0
        for (let index = 0; index < expense.length; index++) {
          if (datasets === expense[index].date.getDate() && date === expense[index].date.getMonth()) {
            sumDayThree = parseFloat(expense[index].figure) + parseFloat(sumDayThree)
          }
        }

        if (sumDayThree == 0) {
          chartdata.series[0].data.push('0')
        }else{
          chartdata.series[0].data.push(sumDayThree)
        }
      }
      res.json(chartdata)
    })
  })
})

ventas.put('/editarIngManual/:id', (req,res) => {
  const data = {
    ingresoFondo : req.body.fondo,
    efectivo : req.body.efectivo,
    egreso : req.body.egreso,
    totalEfectivo : req.body.totalEfectivo,
    credito : req.body.credito,
    debito : req.body.debito,
    transferencia : req.body.transferencia,
    otros : req.body.otros,
    total : req.body.totalEfectivo + req.body.credito + req.body.debito +  req.body.transferencia + req.body.otros
  }
  Cierres.findByIdAndUpdate(req.params.id, {
    $set:{manual:data}
  })
  .then(cierres => {
    res.json({status: 'ok'})
  })
  .catch(err => {
    res.send(err)
  })
})

ventas.get('/setFirstDateOfWeekend', (req, res) => {
  GetWeeks.find()
  .then(getWeek => {
    if(getWeek.length > 0){
      const dateWeek = getWeek[0].date
      const id = getWeek[0]._id
      if (dateWeek.getDay() == 1) {
        GetWeeks.findByIdAndUpdate(id, {
          $set: {
            date: new Date()
          }
        })
        .then(newDateWeek => {
          res.json({status: 'ok'})
        })
        .catch(err => {
          res.send(err)
        })
      }else{
        res.json({status: 'ok'})
      }
    }else{
      GetWeeks.create({date: new Date()})
      .then(cretaeWeek => {
      })
      .catch(err => {
        res.send(err)
      })
    }
  })
})

ventas.get('/deleteSales/:dates', async (req, res) => {
  const split = req.params.dates.split(':')
  const sales = await Venta.deleteMany({
    fecha: {$gte:split[0] , $lte: split[1]}
  })
  
})

module.exports = ventas

