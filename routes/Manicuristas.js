const express = require('express');
const manicurista = express.Router()
const cors = require('cors');
const Manicurista = require('../models/Manicurista')
const Advancement = require('../models/Advancement')
const Expenses = require('../models/Expenses')
const Venta = require('../models/Venta')
const Cierres = require('../models/Cierres')
manicurista.use(cors())

manicurista.get('/dataMetrics/:id', (req, res) => {
  const dateNow = new Date()
  const formatDate = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-1"
  dateNow.setMonth(dateNow.getMonth() + 1)
  const formatDateTwo = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-31"
  var services = 0
  var advancements = 0
  var bonus = 0
  var comission = 0
  Venta.find({
    $and: [
      {manicurista: { $regex: req.params.id, $options: 'i'}},
      {fecha: {$gte: formatDate, $lte: formatDateTwo} },
      {status: true}
    ]
  })
  .then(sales => {
    for (let index = 0; index < sales.length; index++) {
      const element = sales[index];
      var totalComision = 0
      for (let indexThree = 0; indexThree < sales[index].EmployeComision.length; indexThree++) {
        totalComision = req.params.id == sales[index].EmployeComision[0].employe ? sales[index].EmployeComision[0].comision : 0
      }
      comission = parseFloat(comission) + parseFloat(totalComision)
      services = parseFloat(services) + parseFloat(element.servicios.length)
    }
    Advancement.find({
      $and: [
        {date: {$gte: formatDate, $lte: formatDateTwo}},
        {name: req.params.id}
      ] 
    })
    .then(advancement => {
      for (let indexTwo = 0; indexTwo < advancement.length; indexTwo++) {
        const elementTwo = advancement[indexTwo];
        advancements = parseFloat(advancements) + elementTwo.total
      }
      Expenses.find({
        $and: [
          {date: {$gte: formatDate, $lte: formatDateTwo}},
          {expense: { $regex: req.params.id, $options: 'i'}},
          {type: 'Bonus'}
        ] 
      })
      .then(bonuses => {
        for (let indexThree = 0; indexThree < bonuses.length; indexThree++) {
          const elementThree = bonuses[indexThree];
          bonus = parseFloat(bonus) + elementThree.figure
        }
        res.json({servicesLender: services, lenderAvancements: advancements, lenderBonus: bonus, lenderComission:comission})
      }).catch(err => {
        res.send(err)
      })
    }).catch(err => {
      res.send(err)
    })
  }).catch(err => {
    res.send(err)
  })
})

manicurista.get('/', async (req, res) => {
  const manicuristas = await Manicurista.find()
  res.json(manicuristas)
})

manicurista.get('/justone/:nombre', async (req, res) => {
  const manicuristas = await Manicurista.findOne({'nombre':req.params.nombre})
  res.json(manicuristas)
})

manicurista.get('/justOneById/:id', async (req, res) => {
  const manicurista = await Manicurista.findById(req.params.id)
  res.json(manicurista)
})
manicurista.get('/SalesByPrestAll/:nombre', async (req, res) => {
  const dateNow = new Date()
  const formatDate = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+'-1'
  const formatDateTwo = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-31"
  const split = req.params.nombre.split(':')
  const lender = split[0]
  
  const manicuristas = await Venta.find({
    $and: [
      {
        fecha: { $gte: formatDate, $lte: formatDateTwo }
      },
      {status: true}
    ]   
  })

  
  res.json(manicuristas)
})

manicurista.get('/SalesByPrest/:nombre', async (req, res) => {
  const dateNow = new Date()
  const formatDate = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+'-1'
  const formatDateTwo = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-31"
  const split = req.params.nombre.split(':')
  const lender = split[0]
  
  const manicuristas = await Venta.find({
    $and: [
      {manicurista: { $regex: lender, $options: 'i'}},
      {
        fecha: { $gte: formatDate, $lte: formatDateTwo }
      },
      {status: true}
    ]   
  })

  
  res.json(manicuristas)
})
manicurista.get('/advancementsProfile/:data', async (req, res, next) => {
  const data = await Manicurista.find({documento: req.params.data})
  res.json(data)
})

manicurista.get('/findCancelSales', async (req, res, next) => {
  const dateNow = new Date()
  const formatDate = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+'-1'
  const formatDateTwo = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-31"
  
  const manicuristas = await Venta.find({
    $and: [
      {
        fecha: { $gte: formatDate, $lte: formatDateTwo }
      },
      {status: false}
    ]   
  })
  if (manicuristas) {
    let total = 0
    for (let index = 0; index < manicuristas.length; index++) {
      total = total + manicuristas[index].total 
    }
    res.json(total)
  }
  
})

manicurista.post('/', (req, res) => {
  const dataManicurista = {
    nombre: req.body.nombreManicurista,
    documento: req.body.documentoManicurista,
    days: req.body.days,
    comision:0,
    advancement:0,
    bonus:0,
    class: '',
    date: new Date()
  }

  Manicurista.findOne({
    documento: req.body.documentoManicurista
  })
  .then(manicurista => {
    if (!manicurista) {
      Manicurista.find()
      .then(mani => {
        if (mani.length > 0) {
          Manicurista.find().sort({date: -1})
          .then(records => {
            let position = records[0].class.split('s')
            dataManicurista.class = 'class'+ (parseFloat(position[2]) + 1) 
            Manicurista.create(dataManicurista)
            .then(manicurista => {
              res.json({status: "Manicurista ingresada"})
            })
            .catch(err => {
              res.send("error: "+ err)
            })
          })
          .catch(err => {
            res.send("error: "+ err)
          }) 
        }else{
          dataManicurista.class = 'class1'
          Manicurista.create(dataManicurista)
          .then(manicurista => {
            res.json({status: "Manicurista ingresada"})
          })
          .catch(err => {
            res.send("error: "+ err)
          })
        }
      })
      
    }
    else{
      res.json({status: "Manicurista ya existe"})
    }
  })
  .catch(err => {
    res.send("error: " + err)
  })
})

manicurista.post('/registerAdvancement', (req, res) => {
  const dateSelect = req.body.date
  const dateNow = new Date(dateSelect)
  dateNow.setDate(dateNow.getDate() + 1)
  const formatDate = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()

  dateNow.setDate(dateNow.getDate() + 1)
  const formatDateTwo = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()
  const type = req.body.check ? 'Bonus' : 'Advancement'
  
  const dataAdvancement = {
    prest: req.body.prest,
    name: req.body.name,
    reason: req.body.reason,
    total: req.body.total,
    date: req.body.date
  }
   const dataExpense = {
    expense:req.body.reason + ' / ' + req.body.name,
    lenderId: req.body.id,
    type: type,
    figure:req.body.total,
    date: req.body.date
   }

    Expenses.create(dataExpense)
    .then(expense => {
      if (req.body.check) {
        Manicurista.findByIdAndUpdate(req.body.prest, { $inc: { bonus: req.body.total }})
        .then(update => {
          res.json({status: 'bonus'})
        })
        .catch(err => {
          res.send(err)
        })
      }
      else{
        Manicurista.findByIdAndUpdate(req.body.prest, { $inc: { advancement: req.body.total }})
        .then(update => {
          Advancement.create(dataAdvancement)
          .then(advancement => {
            res.json({status: 'advancement'})
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

})

manicurista.get('/advancements/:id', async (req, res) => {
  const advancement = await Advancement.find({prest: req.params.id})
  res.json(advancement)
})

manicurista.get('/getBonusByEmploye/:id', async (req, res) => {
  const bonuses = await Expenses.find({lenderId: req.params.id})
  res.json(bonuses)
})

manicurista.delete('/:id', async (req, res) => {
  const manicuristas = await Manicurista.findByIdAndRemove(req.params.id)
  res.json({
    status: 'Manicurista Eliminada'
  })
})

manicurista.put('/:id', (req, res) => {
  Manicurista.findByIdAndUpdate(req.params.id, {
    $set: {
      nombre: req.body.nombre,
      documento: req.body.documento, 
      days: req.body.days,
      comision: req.body.comision
    }
  })
  .then(manicurista => {
    res.json({status: 'Manicurista Editada'})
  })
  .catch(err => {
    res.send('error: ' + err)
  })
})


manicurista.put('/ClosePrest/:id', (req, res) => {
  Manicurista.findByIdAndUpdate(req.params.id, {
    $set: {
      comision:0,
      advancement:0,
      bonus:0
    }
  })
  .then(manicurista => {
    res.json({status: 'ok'})
  })
  .catch(err => {
    res.send('error: ' + err)
  })
})

manicurista.get('/GetSalesPerMonth/:prestador', (req, res) => {
  const thisDate = new Date()
  const date = thisDate.getMonth()
  const prest = req.params.prestador.split(':')
  const lender = prest[0] + '/' + prest[1]
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

  Venta.find({manicurista:lender})
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

manicurista.get('/CompareSalesAndExpenses', (req, res) => {
  const thisDate = new Date()
  const date = thisDate.getMonth()
  
  let chartdata = {
    labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
    datasets: [ 
      {
        label: 'Ventas',
        backgroundColor: 'rgba(31, 86, 115, .8)',
        data: [],
        fontColor: 'red'
      },
      {
        label: 'Gastos',
        backgroundColor: 'rgba(14, 48, 66, .8)',
        data: [],
        fontColor: 'red'
      }
    ]
  }

  Venta.find()
  .then(ventas => {
    for (let indexOne = 0; indexOne < chartdata.labels.length; indexOne++) {
      let datasets = chartdata.labels[indexOne]
      let sumDay = 0
      for (let index = 0; index < ventas.length; index++) {
        if (datasets === ventas[index].fecha.getDate() && date === ventas[index].fecha.getMonth()) {
          sumDay = parseFloat(ventas[index].total) + parseFloat(sumDay)
        }
      }

      if (sumDay == 0) {
        chartdata.datasets[0].data.push('0')
      }else{
        chartdata.datasets[0].data.push(sumDay)
      }
    }
    Expenses.find()
    .then(expenses => {
      for (let indexOne = 0; indexOne < chartdata.labels.length; indexOne++) {
        let datasets = chartdata.labels[indexOne]
        let sumDay = 0
        for (let index = 0; index < expenses.length; index++) {
          if (datasets === expenses[index].date.getDate() && date === expenses[index].date.getMonth()) {
            sumDay = parseFloat(expenses[index].figure) + parseFloat(sumDay)
          }
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
})


module.exports = manicurista
