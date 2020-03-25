const express = require('express')
const metrics = express.Router()
const cors = require('cors')

const Cliente = require('../models/Cliente')
const Venta = require('../models/Venta')
const Expenses = require('../models/Expenses')

metrics.use(cors())


metrics.get('/top', async (req, res) => {
  const participacion = await Cliente.find().sort({participacion: -1}).limit(10)
  res.json(participacion)
})

metrics.get('/dailyProduction/:date', async (req, res) => {
  const split = req.params.date.split(':')
  let series = [
    {
      name:"Venta total",
      data: []
    }
  ]
  let dataTable = [

  ]
  const sales = await Venta.find({$and: [
    {fecha: {$gte:split[0] , $lte: split[1]}},
    {status: true}
  ]}).sort({fecha: 1})
  if (sales) {
    var sumDay = 0
    for (let index = 0; index < sales.length; index++) {
      let date = sales[index].fecha
      let dateFormat = date.getFullYear()+'-'+(date.getMonth() + 1)+'-'+date.getDate()
      let dateTimeFormat = date.getTime()
      let datePrev, dateFormatPrev, dateTimeFormatPrev
      if (index > 0) {
        datePrev = sales[index - 1].fecha
        dateTimeFormatPrev = datePrev.getTime()
        dateFormatPrev = datePrev.getFullYear()+'-'+(datePrev.getMonth() + 1)+'-'+datePrev.getDate()
      }
      if (index > 0 ) {
        if (dateFormat == dateFormatPrev) {
          sumDay = sales[index].total + sumDay
        }else{
          series[0].data.push([dateTimeFormatPrev,sumDay])
          dataTable.push({fecha: dateFormatPrev, total: sumDay})
          sumDay = 0
          sumDay = sales[index].total
          if ((index+1) == sales.length) {
            series[0].data.push([dateTimeFormat, sumDay])
            dataTable.push({fecha: dateFormat, total: sumDay})
          }
        }
      }else{
        sumDay = sales[index].total
      }
    }
    res.json({series:series, dataTable: dataTable})
  }
})

metrics.get('/total', (req, res) => {
  Venta.find().count()
  .then(total => {
    res.json({status: total})
  })
})

metrics.get('/dailyExpenseGainTotal/:date', async (req, res) => {
  const split = req.params.date.split(':')
  let series = [
    {
      name: "Total de ventas",
      data: []
    },
    {
      name: "Total de ganancias",
      data: []
    },
    {
      name: "Gastos",
      data: []
    }
  ]
  const dataTable = []
  const sales = await Venta.find({$and: [
    {fecha: {$gte:split[0] , $lte: split[1]}},
    {status: true}
  ]}).sort({fecha: 1})
  if (sales) {
    var sumTotal = 0
    var sumGain = 0
    for (let index = 0; index < sales.length; index++) {
      let date = sales[index].fecha
      let dateFormat = date.getFullYear()+'-'+(date.getMonth() + 1)+'-'+date.getDate()
      let dateTimeFormat = date.getTime()
      let datePrev, dateFormatPrev, dateTimeFormatPrev
      if (index > 0) {
        datePrev = sales[index - 1].fecha
        dateTimeFormatPrev = datePrev.getTime()
        dateFormatPrev = datePrev.getFullYear()+'-'+(datePrev.getMonth() + 1)+'-'+datePrev.getDate()
      }
      if (index > 0 ) {
        if (dateFormat == dateFormatPrev) {
          sumTotal = sales[index].total + sumTotal
          sumGain = sales[index].ganancialocal + sumGain
        }else{
          series[0].data.push([dateTimeFormatPrev, sumTotal])
          series[1].data.push([dateTimeFormatPrev, sumGain])
          dataTable.push({Fecha: dateFormatPrev, Tipo: 'Total venta', Monto: sumTotal})
          dataTable.push({Fecha: dateFormatPrev, Tipo: 'Total ganancias', Monto: sumGain})
          sumTotal = 0
          sumGain = 0
          sumTotal = sales[index].total
          sumGain = sales[index].ganancialocal
          if ((index+1) == sales.length) {
            series[0].data.push([dateTimeFormat, sumTotal])
            series[1].data.push([dateTimeFormat, sumGain])
            dataTable.push({Fecha: dateFormat, Tipo: 'Total venta', Monto: sumTotal})
            dataTable.push({Fecha: dateFormat, Tipo: 'Total ganancias', Monto: sumGain})
          }
        }
      }else{
        sumTotal = sales[index].total
        sumGain = sales[index].ganancialocal
      }
    }
    const expenses = await Expenses.find({
      date: {$gte:split[0] , $lte: split[1]}
    })
    if (expenses) {
      var sumExpense = 0
      for (let indexTwo = 0; indexTwo < expenses.length; indexTwo++) {
        let date = sales[indexTwo].fecha
        let dateFormat = date.getFullYear()+'-'+(date.getMonth() + 1)+'-'+date.getDate()
        let dateTimeFormat = date.getTime()
        let datePrev, dateFormatPrev, dateTimeFormatPrev
        if (indexTwo > 0) {
          datePrev = sales[indexTwo - 1].fecha
          dateTimeFormatPrev = datePrev.getTime()
          dateFormatPrev = datePrev.getFullYear()+'-'+(datePrev.getMonth() + 1)+'-'+datePrev.getDate()
        }
        if (indexTwo > 0 ) {
          if (dateFormat == dateFormatPrev) {
            sumExpense = expenses[indexTwo].figure + sumExpense
          }else{
            series[2].data.push([dateTimeFormatPrev, sumExpense])
            dataTable.push({Fecha: dateFormatPrev, Tipo: 'Gasto', Monto: sumExpense})
            sumExpense = 0
            sumExpense = expenses[indexTwo].figure
            if ((indexTwo+1) == expenses.length) {
              series[2].data.push([dateTimeFormat, sumExpense])
              dataTable.push({Fecha: dateFormat, Tipo: 'Gasto', Monto: sumExpense})
            }
          }
        }else{
          sumExpense = expenses[indexTwo].figure
        }
      }
      res.json({series:series, dataTable:dataTable})
    }
    
  }
})

metrics.get('/dailyServices/:date', async (req, res) => {
  const split = req.params.date.split(':')
  let series = [
    {
      name: 'Servicios totales', 
      data: []
    }
  ]
  let dataTable = []
  const sales = await Venta.find({$and: [
    {fecha: {$gte:split[0] , $lte: split[1]}},
    {status: true}
  ]}).sort({fecha: 1})
  if (sales) {
    var sumDay = 0
    for (let index = 0; index < sales.length; index++) {
      let date = sales[index].fecha
      let dateFormat = date.getFullYear()+'-'+(date.getMonth() + 1)+'-'+date.getDate()
      let dateTimeFormat = date.getTime()
      let datePrev, dateFormatPrev, dateTimeFormatPrev
      if (index > 0) {
        datePrev = sales[index - 1].fecha
        dateTimeFormatPrev = datePrev.getTime()
        dateFormatPrev = datePrev.getFullYear()+'-'+(datePrev.getMonth() + 1)+'-'+datePrev.getDate()
      }
      if (index > 0 ) {
        if (dateFormat == dateFormatPrev) {
          sumDay = sales[index].servicios.length + sumDay
        }else{
          series[0].data.push([dateTimeFormatPrev, sumDay])
          dataTable.push({Fecha: dateFormatPrev, Cantidad: sumDay})
          sumDay = 0
          sumDay = sales[index].servicios.length
          if ((index+1) == sales.length) {
            series[0].data.push([dateTimeFormat, sumDay])
            dataTable.push({Fecha: dateFormat, Cantidad: sumDay})
          }
        }
      }else{
        sumDay = sales[index].servicios.length
      }
    }
    res.json({series:series, dataTable: dataTable})
  }
})

metrics.get('/quantityProductionPerLender/:date', async (req, res) => {
  const split = req.params.date.split(':')
  let quantity = []
  let series = []
  let dataTable = []
  const sales = await Venta.find({$and: [
    {fecha: {$gte:split[0] , $lte: split[1]}},
    {status: true}
  ]}).sort({fecha: 1})
  if (sales) {
    const lenders = await Manicurista.find()
    if (lenders) {
      for (let indexTwo = 0; indexTwo < lenders.length; indexTwo++) {
        series.push({name: lenders[indexTwo].nombre, data: []})
        var sumDay = 0
        for (let index = 0; index < sales.length; index++) {
          let date = sales[index].fecha
          let dateFormat = date.getFullYear()+'-'+(date.getMonth() + 1)+'-'+date.getDate()
          let dateTimeFormat = date.getTime()
          let datePrev, dateFormatPrev, dateTimeFormatPrev
          if (index > 0) {
            datePrev = sales[index - 1].fecha
            dateTimeFormatPrev = datePrev.getTime()
            dateFormatPrev = datePrev.getFullYear()+'-'+(datePrev.getMonth() + 1)+'-'+datePrev.getDate()
          }
          let name = false
          for (let indexThree = 0; indexThree < sales[index].EmployeComision.length; indexThree++) {
            name = lenders[indexTwo].nombre == sales[index].EmployeComision[indexThree].employe ? true : false
          }
          console.log(name)
          if (index > 0 ) {
            if (dateFormat == dateFormatPrev) {
              if (name) {
                sumDay = sales[index].total + sumDay
              }
            }else{
              series[indexTwo].data.push([dateTimeFormatPrev, sumDay])
              dataTable.push({Fecha: dateFormatPrev, Prestadora: lenders[indexTwo].nombre, Monto: sumDay})
              sumDay = 0
              sumDay = sales[index].total
              if ((index+1) == sales.length) {
                series[indexTwo].data.push([dateTimeFormat, sumDay])
                dataTable.push({Fecha: dateFormat, Prestadora: lenders[indexTwo].nombre, Monto: sumDay})
              }
            }
          }else{
            sumDay = sales[index].total
          }
        }
      }
      res.json({series: series, dataTable:dataTable})
    }
  }
})

metrics.get('/quantityComissionPerLender/:date', async (req, res) => {
  const split = req.params.date.split(':')
  let quantity = []
  let chartdata = {
    series: [],
  }
  const sales = await Venta.find({$and: [
    {fecha: {$gte:split[0] , $lte: split[1]}},
    {status: true}
  ]}).sort({fecha: 1})
  if (sales) {
    const lenders = await Manicurista.find()
    if (lenders) {
      for (let indexTwo = 0; indexTwo < lenders.length; indexTwo++) {
        chartdata.series.push({name: lenders[indexTwo].nombre, data: []})
        var sumDay = 0
        for (let index = 0; index < sales.length; index++) {
          let date = sales[index].fecha
          let dateFormat = date.getFullYear()+'-'+(date.getMonth() + 1)+'-'+date.getDate()
          let datePrev, dateFormatPrev
          if (index > 0) {
            datePrev = sales[index - 1].fecha
            dateFormatPrev = datePrev.getFullYear()+'-'+(datePrev.getMonth() + 1)+'-'+datePrev.getDate()
          }
          let name = false
          let totalComission = 0
          for (let indexThree = 0; indexThree < sales[index].EmployeComision.length; indexThree++) {
            name = lenders[indexTwo].nombre == sales[index].EmployeComision[indexThree].employe ? true : false
            totalComission = lenders[indexTwo].nombre == sales[index].EmployeComision[indexThree].employe ? sales[index].comision : 0
          }
          
          if (index > 0 ) {
            if (dateFormat == dateFormatPrev) {
              if (name) {
                sumDay = totalComission + sumDay
              }
            }else{
              chartdata.series[indexTwo].data.push({total: sumDay, date: dateFormatPrev})
              sumDay = 0
              sumDay = totalComission
              if ((index+1) == sales.length) {
                chartdata.series[indexTwo].data.push({total: sumDay, date: dateFormat})
              }
            }
          }else{
            sumDay = totalComission
          }
        }
      }
      res.json({chartdata: chartdata})
    }
  }
})

metrics.get('/dailyQuantityPerDay/:date', async (req, res) => {
  const split = req.params.date.split(':')
  let categories = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
  let series = [
    {
      name: "Produccion",
      data:[0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: "Servicios",
      data:[0, 0, 0, 0, 0, 0, 0],
    }
  ]
  const sales = await Venta.find({$and: [
    {fecha: {$gte:split[0] , $lte: split[1]}},
    {status: true}
  ]}).sort({fecha: 1})
  if (sales) {
    var sumDay = 0
    for (let index = 0; index < sales.length; index++) {
      let date = sales[index].fecha.getDay()
      series[0].data[date] = series[0].data[date] + sales[index].total
      series[1].data[date] = series[1].data[date] + sales[index].servicios.length
    }
    res.json({series:series, categories:categories})
  }
})

metrics.get('/dailyAveragePerDay/:date', async (req, res) => {
  const split = req.params.date.split(':')
  let categories = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
  let totals = [ 
    {
      data:[{sum: 0, Quantity: 0}, {sum: 0, Quantity: 0}, {sum: 0, Quantity: 0}, {sum: 0, Quantity: 0}, {sum: 0, Quantity: 0}, {sum: 0, Quantity: 0}, {sum: 0, Quantity: 0}]
    },
    {
      data:[{sum: 0, Quantity: 0}, {sum: 0, Quantity: 0}, {sum: 0, Quantity: 0}, {sum: 0, Quantity: 0}, {sum: 0, Quantity: 0}, {sum: 0, Quantity: 0}, {sum: 0, Quantity: 0}]
    }
  ]
  let series = [
    {
      name: "Produccion",
      data:[],
    },
    {
      name: "Servicios",
      data:[],
    }
  ]
  const sales = await Venta.find({$and: [
    {fecha: {$gte:split[0] , $lte: split[1]}},
    {status: true}
  ]}).sort({fecha: 1})
  if (sales) {
    for (let index = 0; index < sales.length; index++) {
      let date = sales[index].fecha.getDay()
      totals[0].data[date].sum = parseFloat(totals[0].data[date].sum) + parseFloat(sales[index].total)
      totals[1].data[date].sum = parseFloat(totals[1].data[date].sum) + parseFloat(sales[index].servicios.length)
      totals[0].data[date].Quantity = totals[0].data[date].Quantity + 1
      totals[1].data[date].Quantity = totals[1].data[date].Quantity + 1
    }
    var fixed = 0
    for (let indexTwo = 0; indexTwo < 6; indexTwo++) {
      series[0].data.push(parseFloat(totals[0].data[indexTwo].sum) / parseFloat(totals[0].data[indexTwo].Quantity)) 
      fixed = parseFloat(totals[1].data[indexTwo].sum) / parseFloat(totals[1].data[indexTwo].Quantity)
      series[1].data.push(parseFloat(fixed.toFixed(2)))
    }
    res.json({series:series, categories:categories})
  }
})

metrics.get('/getTopTenBestClients', (req, res) => {
    let chartdata = {
        labels: [],
        datasets: [ 
          {
            label: 'Top 10 mejores clientes',
            backgroundColor: 'rgba(31, 86, 115, .8)',
            data: []
          }
        ]
      }

    Cliente.find().sort({participacion: -1}).limit(10)
    .then(topClients => {
        for (let indexTwo = 0; indexTwo < topClients.length; indexTwo++) {
            chartdata.labels.push(topClients[indexTwo].nombre)
            chartdata.datasets[0].data.push(topClients[indexTwo].participacion)
          }
          res.json(chartdata)
    })
})

metrics.get('/getTopTenBestClientsRecommendations', (req, res) => {
    let chartdata = {
        labels: [],
        datasets: [ 
          {
            label: 'Top 10 mejores clientes',
            backgroundColor: 'rgba(31, 86, 115, .8)',
            data: []
          }
        ]
      }

    Cliente.find().sort({recomendaciones: -1}).limit(10)
    .then(topClients => {
        for (let indexTwo = 0; indexTwo < topClients.length; indexTwo++) {
            chartdata.labels.push(topClients[indexTwo].nombre)
            chartdata.datasets[0].data.push(topClients[indexTwo].recomendaciones)
          }
          res.json(chartdata)
    })
})


module.exports = metrics
