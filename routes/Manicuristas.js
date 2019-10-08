const express = require('express');
const manicurista = express.Router()
const cors = require('cors');
const Manicurista = require('../models/Manicurista')
const Advancement = require('../models/Advancement')
const Expenses = require('../models/Expenses')
const Venta = require('../models/Venta')
const Cierres = require('../models/Cierres')
manicurista.use(cors())

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

manicurista.get('/SalesByPrest/:nombre', async (req, res) => {
  const manicuristas = await Venta.find({'manicurista':req.params.nombre})
  res.json(manicuristas)
})

manicurista.post('/', (req, res) => {
  const dataManicurista = {
    nombre: req.body.nombreManicurista,
    documento: req.body.documentoManicurista,
    porcentaje: req.body.porcentajeManicurista,
    comision: 0
  }

  Manicurista.findOne({
    documento: req.body.documentoManicurista
  })
  .then(manicurista => {
    if (!manicurista) {
      Manicurista.create(dataManicurista)
      .then(manicurista => {
        res.json({status: "Manicurista ingresada"})
      })
      .catch(err => {
        res.send("error: "+ err)
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

  const dataAdvancement = {
    prest: req.body.prest,
    name: req.body.name,
    reason: req.body.reason,
    total: req.body.total,
    date: req.body.date
  }
   const dataExpense = {
    expense:req.body.reason,
    type:'Advancement',
    figure:req.body.total,
    date: req.body.date
   }

  Advancement.create(dataAdvancement)
  .then(Advancement => {
    Expenses.create(dataExpense)
    .then(expense => {
      Cierres.findOneAndUpdate({fecha: { $gte: formatDate, $lte: formatDateTwo }},
        { $inc : { gastos: req.body.total }
      })
      .then(close => {
        if (close) {
          res.json({status: 'ok'})
        }else{
          res.json({status: 'bad'})
        }
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
    res.send("error: " + err)
  })

})

manicurista.get('/advancements/:id', async (req, res) => {
  const advancement = await Advancement.find({prest: req.params.id})
  res.json(advancement)
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
      porcentaje: req.body.porcentaje
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
      comision:0
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
  const prest = req.params.prestador
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
        backgroundColor: '#6A7693',
        data: []
      },
      {
        label: month,
        backgroundColor: '#29323c',
        data: []
      }
    ]
  }

  Venta.find({manicurista:prest})
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

module.exports = manicurista
