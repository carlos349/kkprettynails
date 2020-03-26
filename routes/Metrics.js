const express = require('express')
const metrics = express.Router()
const cors = require('cors')

const Cliente = require('../models/Cliente')
const Venta = require('../models/Venta')
const Expenses = require('../models/Expenses')
const Servicio = require('../models/Servicios')

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
  const dateGood = new Date(split[1])
  dateGood.setDate(dateGood.getDate() + 1)
  const finalDate = dateGood.getFullYear()+'-'+(dateGood.getMonth() + 1)+'-'+dateGood.getDate()
  const sales = await Venta.find({$and: [
    {fecha: {$gte:split[0] , $lte: finalDate}},
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
          if ((index+1) == sales.length) {
            series[0].data.push([dateTimeFormat, sumDay])
            dataTable.push({fecha: dateFormat, total: sumDay})
          }
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
  const dateGood = new Date(split[1])
  dateGood.setDate(dateGood.getDate() + 1)
  const finalDate = dateGood.getFullYear()+'-'+(dateGood.getMonth() + 1)+'-'+dateGood.getDate()
  const sales = await Venta.find({$and: [
    {fecha: {$gte:split[0] , $lte: finalDate}},
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
          if ((index+1) == sales.length) {
            series[0].data.push([dateTimeFormat, sumTotal])
            series[1].data.push([dateTimeFormat, sumGain])
            dataTable.push({Fecha: dateFormat, Tipo: 'Total venta', Monto: sumTotal})
            dataTable.push({Fecha: dateFormat, Tipo: 'Total ganancias', Monto: sumGain})
          }
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
      date: {$gte:split[0] , $lte: finalDate}
    }).sort({date: 1})
    if (expenses) {
      var sumExpense = 0
      for (let indexTwo = 0; indexTwo < expenses.length; indexTwo++) {
        let date = expenses[indexTwo].date
        let dateFormat = date.getFullYear()+'-'+(date.getMonth() + 1)+'-'+date.getDate()
        let dateTimeFormat = date.getTime()
        let datePrev, dateFormatPrev, dateTimeFormatPrev
        if (indexTwo > 0) {
          datePrev = expenses[indexTwo - 1].date
          dateTimeFormatPrev = datePrev.getTime()
          dateFormatPrev = datePrev.getFullYear()+'-'+(datePrev.getMonth() + 1)+'-'+datePrev.getDate()
        }
        if (indexTwo > 0 ) {
          if (dateFormat == dateFormatPrev) {
            sumExpense = expenses[indexTwo].figure + sumExpense
            if ((indexTwo+1) == expenses.length) {
              series[2].data.push([dateTimeFormat, sumExpense])
              dataTable.push({Fecha: dateFormat, Tipo: 'Gasto', Monto: sumExpense})
            }
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
  const dateGood = new Date(split[1])
  dateGood.setDate(dateGood.getDate() + 1)
  const finalDate = dateGood.getFullYear()+'-'+(dateGood.getMonth() + 1)+'-'+dateGood.getDate()
  const sales = await Venta.find({$and: [
    {fecha: {$gte:split[0] , $lte: finalDate}},
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
          if ((index+1) == sales.length) {
            series[0].data.push([dateTimeFormat, sumDay])
            dataTable.push({Fecha: dateFormat, Cantidad: sumDay})
          }
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
  const dateGood = new Date(split[1])
  dateGood.setDate(dateGood.getDate() + 1)
  const finalDate = dateGood.getFullYear()+'-'+(dateGood.getMonth() + 1)+'-'+dateGood.getDate()
  const sales = await Venta.find({$and: [
    {fecha: {$gte:split[0] , $lte: finalDate}},
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
                if ((index+1) == sales.length) {
                  series[indexTwo].data.push([dateTimeFormat, sumDay])
                  dataTable.push({Fecha: dateFormat, Prestadora: lenders[indexTwo].nombre, Monto: sumDay})
                }
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
  let series = []
  let dataTable = []
  const dateGood = new Date(split[1])
  dateGood.setDate(dateGood.getDate() + 1)
  const finalDate = dateGood.getFullYear()+'-'+(dateGood.getMonth() + 1)+'-'+dateGood.getDate()
  const sales = await Venta.find({$and: [
    {fecha: {$gte:split[0] , $lte: finalDate}},
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
          let datePrev, dateFormatPrev
          if (index > 0) {
            datePrev = sales[index - 1].fecha
            dateTimeFormatPrev = datePrev.getTime()
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
                if ((index+1) == sales.length) {
                  series[indexTwo].data.push([dateTimeFormat, sumDay])
                  dataTable.push({Fecha: dateFormat, Prestadora: lenders[indexTwo].nombre, Monto: sumDay})
                }
              }
            }else{
              series[indexTwo].data.push([dateTimeFormatPrev, sumDay])
              dataTable.push({Fecha: dateFormatPrev, Prestadora: lenders[indexTwo].nombre, Monto: sumDay})
              sumDay = 0
              sumDay = totalComission
              if ((index+1) == sales.length) {
                series[indexTwo].data.push([dateTimeFormat, sumDay])
                dataTable.push({Fecha: dateFormat, Prestadora: lenders[indexTwo].nombre, Monto: sumDay})
              }
            }
          }else{
            sumDay = totalComission
          }
        }
      }
      res.json({series: series, dataTable: dataTable})
    }
  }
})

metrics.get('/quantityServicesPerLender/:date', async (req, res) => {
  const split = req.params.date.split(':')
  let quantity = []
  let series = []
  let dataTable = []
  const dateGood = new Date(split[1])
  dateGood.setDate(dateGood.getDate() + 1)
  const finalDate = dateGood.getFullYear()+'-'+(dateGood.getMonth() + 1)+'-'+dateGood.getDate()
  const sales = await Venta.find({$and: [
    {fecha: {$gte:split[0] , $lte: finalDate}},
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
          let datePrev, dateFormatPrev
          if (index > 0) {
            datePrev = sales[index - 1].fecha
            dateTimeFormatPrev = datePrev.getTime()
            dateFormatPrev = datePrev.getFullYear()+'-'+(datePrev.getMonth() + 1)+'-'+datePrev.getDate()
          }
          let name = false
          let totalServices = 0
          for (let indexThree = 0; indexThree < sales[index].EmployeComision.length; indexThree++) {
            name = lenders[indexTwo].nombre == sales[index].EmployeComision[indexThree].employe ? true : false
            totalServices = lenders[indexTwo].nombre == sales[index].EmployeComision[indexThree].employe ? sales[index].servicios.length : 0
          }
          
          if (index > 0 ) {
            if (dateFormat == dateFormatPrev) {
              if (name) {
                sumDay = totalServices + sumDay
                if ((index+1) == sales.length) {
                  series[indexTwo].data.push([dateTimeFormat, sumDay])
                  dataTable.push({Fecha: dateFormat, Prestadora: lenders[indexTwo].nombre, Monto: sumDay})
                }
              }
            }else{
              series[indexTwo].data.push([dateTimeFormatPrev, sumDay])
              dataTable.push({Fecha: dateFormatPrev, Prestadora: lenders[indexTwo].nombre, Monto: sumDay})
              sumDay = 0
              sumDay = totalServices
              if ((index+1) == sales.length) {
                series[indexTwo].data.push([dateTimeFormat, sumDay])
                dataTable.push({Fecha: dateFormat, Prestadora: lenders[indexTwo].nombre, Monto: sumDay})
              }
            }
          }else{
            sumDay = totalServices
          }
        }
      }
      res.json({series: series, dataTable: dataTable})
    }
  }
})

metrics.post('/detailPerLender/:date', async (req, res) => {
  const split = req.params.date.split(':')
  const lender = req.body.lender
  console.log(lender)
  let quantity = []
  let series = [
    {
      name: 'Total producido', 
      data: []
    },
    {
      name: 'Comisión', 
      data: []
    },
    {
      name: 'Sevicios', 
      data: []
    }
  ]
  let dataTable = []
  const dateGood = new Date(split[1])
  dateGood.setDate(dateGood.getDate() + 1)
  const finalDate = dateGood.getFullYear()+'-'+(dateGood.getMonth() + 1)+'-'+dateGood.getDate()
  const sales = await Venta.find({$and: [
    {fecha: {$gte:split[0] , $lte: finalDate}},
    {status: true}
  ]}).sort({fecha: 1})
  if (sales) {
    var sumDayServices = 0
    var sumDayProduction = 0
    var sumDayComission = 0
    for (let index = 0; index < sales.length; index++) {
      let date = sales[index].fecha
      let dateFormat = date.getFullYear()+'-'+(date.getMonth() + 1)+'-'+date.getDate()
      let dateTimeFormat = date.getTime()
      let datePrev, dateFormatPrev
      if (index > 0) {
        datePrev = sales[index - 1].fecha
        dateTimeFormatPrev = datePrev.getTime()
        dateFormatPrev = datePrev.getFullYear()+'-'+(datePrev.getMonth() + 1)+'-'+datePrev.getDate()
      }
      let name = false
      let totalServices = 0
      let totalProduction = 0
      let totalComision = 0
      for (let indexThree = 0; indexThree < sales[index].EmployeComision.length; indexThree++) {
        name = lender == sales[index].EmployeComision[0].employe ? true : false
        totalServices = lender == sales[index].EmployeComision[0].employe ? sales[index].servicios.length : 0
        totalProduction = lender == sales[index].EmployeComision[0].employe ? sales[index].total : 0
        totalComision = lender == sales[index].EmployeComision[0].employe ? sales[index].EmployeComision[0].comision : 0
      }
      
      if (index > 0 ) {
        if (dateFormat == dateFormatPrev) {
          if (name) {
            sumDayProduction = totalProduction + sumDayProduction
            sumDayComission = totalComision + sumDayComission
            sumDayServices = totalServices + sumDayServices
            if ((index+1) == sales.length) {
              series[0].data.push([dateTimeFormat, sumDayProduction])
              series[1].data.push([dateTimeFormat, sumDayComission])
              series[2].data.push([dateTimeFormat, sumDayServices])
              dataTable.push({Fecha: dateFormat, totalProduction: sumDayProduction, totalComision: sumDayComission, totalServices: sumDayServices})
            }
          }
        }else{
          series[0].data.push([dateTimeFormatPrev, sumDayProduction])
          series[1].data.push([dateTimeFormatPrev, sumDayComission])
          series[2].data.push([dateTimeFormatPrev, sumDayServices])
          dataTable.push({Fecha: dateFormatPrev, totalProduction: sumDayProduction, totalComision: sumDayComission, totalServices: sumDayServices})
          sumDayProduction = 0
          sumDayComission = 0
          sumDayServices = 0
          sumDayProduction = totalProduction
          sumDayComission = totalComision
          sumDayServices = totalServices
          if ((index+1) == sales.length) {
            series[0].data.push([dateTimeFormat, sumDayProduction])
            series[1].data.push([dateTimeFormat, sumDayComission])
            series[2].data.push([dateTimeFormat, sumDayServices])
            dataTable.push({Fecha: dateFormat, totalProduction: sumDayProduction, totalComision: sumDayComission, totalServices: sumDayServices})
          }
        }
      }else{
        sumDayProduction = totalProduction
        sumDayComission = totalComision
        sumDayServices = totalServices
      }
    }
    res.json({series: series, dataTable: dataTable})
  }
})

metrics.get('/quantityServicesPerService/:date', async (req, res) => {
  const split = req.params.date.split(':')
  let quantity = []
  let series = []
  let dataTable = []
  const dateGood = new Date(split[1])
  dateGood.setDate(dateGood.getDate() + 1)
  const finalDate = dateGood.getFullYear()+'-'+(dateGood.getMonth() + 1)+'-'+dateGood.getDate()
  const sales = await Venta.find({$and: [
    {fecha: {$gte:split[0] , $lte: finalDate}},
    {status: true}
  ]}).sort({fecha: 1})
  if (sales) {
    const Services = await Servicio.find()
    if (Services) {
      for (let indexTwo = 0; indexTwo < Services.length; indexTwo++) {
        series.push({name: Services[indexTwo].nombre, data: []})
        var sumDay = 0
        for (let index = 0; index < sales.length; index++) {
          let date = sales[index].fecha
          let dateFormat = date.getFullYear()+'-'+(date.getMonth() + 1)+'-'+date.getDate()
          let dateTimeFormat = date.getTime()
          let datePrev, dateFormatPrev
          if (index > 0) {
            datePrev = sales[index - 1].fecha
            dateTimeFormatPrev = datePrev.getTime()
            dateFormatPrev = datePrev.getFullYear()+'-'+(datePrev.getMonth() + 1)+'-'+datePrev.getDate()
          }
          let name = false
          let totalServices = 0
          for (let indexThree = 0; indexThree < sales[index].servicios.length; indexThree++) {
            name = Services[indexTwo].nombre == sales[index].servicios[indexThree].servicio ? true : false
            totalServices = Services[indexTwo].nombre == sales[index].servicios[indexThree].servicio ? 1 : 0
          }
          
          if (index > 0 ) {
            if (dateFormat == dateFormatPrev) {
              if (name) {
                sumDay = totalServices + sumDay
                if ((index+1) == sales.length) {
                  if (sumDay > 0) {
                    series[indexTwo].data.push([dateTimeFormat, sumDay])
                    dataTable.push({Fecha: dateFormat, Servicio: Services[indexTwo].nombre, Cantidad: sumDay})
                  }
                }
              }
            }else{
              if (sumDay > 0) {
                series[indexTwo].data.push([dateTimeFormatPrev, sumDay])
                dataTable.push({Fecha: dateFormatPrev, Servicio: Services[indexTwo].nombre, Cantidad: sumDay})
              }
              sumDay = 0
              sumDay = totalServices
              if ((index+1) == sales.length) {
                if (sumDay > 0) {
                  series[indexTwo].data.push([dateTimeFormat, sumDay])
                  dataTable.push({Fecha: dateFormat, Servicio: Services[indexTwo].nombre, Cantidad: sumDay})
                }
              }
            }
          }else{
            sumDay = totalServices
          }
        }
      }
      res.json({series: series, dataTable: dataTable})
    }
  }
})

//Daily

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
  let dataTable =  []
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
    for (let indexTwo = 0; indexTwo < categories.length; indexTwo++) {
      dataTable.push({Dia: categories[indexTwo], Servicios: series[1].data[indexTwo],Produccion: series[0].data[indexTwo]})
    }
    res.json({series:series, categories:categories, dataTable: dataTable})
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
  let dataTable =  []
  const sales = await Venta.find({$and: [
    {fecha: {$gte:split[0] , $lte: split[1]}},
    {status: true}
  ]}).sort({fecha: 1})
  if (sales) {
    for (let index = 0; index < sales.length; index++) {
      let date = sales[index].fecha.getDay()
      let dateValid = sales[index].fecha
      let dateFormat = dateValid.getFullYear()+'-'+(dateValid.getMonth() + 1)+'-'+dateValid.getDate()
      let datePrev, dateFormatPrev
      if (index > 0) {
        datePrev = sales[index - 1].fecha
        dateFormatPrev = datePrev.getFullYear()+'-'+(datePrev.getMonth() + 1)+'-'+datePrev.getDate()
      }else{
        dateFormatPrev = dateFormat
      }
      totals[0].data[date].sum = parseFloat(totals[0].data[date].sum) + parseFloat(sales[index].total)
      totals[1].data[date].sum = parseFloat(totals[1].data[date].sum) + parseFloat(sales[index].servicios.length)
      if (dateFormat != dateFormatPrev) {
        totals[0].data[date].Quantity = totals[0].data[date].Quantity + 1
        totals[1].data[date].Quantity = totals[1].data[date].Quantity + 1
      }
    }
    console.log(totals[0].data)
    for (let indexTwo = 0; indexTwo < 7; indexTwo++) {
      if (totals[0].data[indexTwo].sum == 0) {
        series[0].data.push(0) 
        series[1].data.push(0)
      }else{
        series[0].data.push((totals[0].data[indexTwo].sum / totals[0].data[indexTwo].Quantity).toFixed(2)) 
        series[1].data.push((totals[1].data[indexTwo].sum / totals[1].data[indexTwo].Quantity).toFixed(2))
      }
      dataTable.push({Dia: categories[indexTwo], Servicios: series[1].data[indexTwo], Produccion: series[0].data[indexTwo]})
    }
    res.json({series:series, categories:categories, dataTable: dataTable})
  }
})

metrics.get('/getTopTenBestClients', (req, res) => {
    let categories = []
    let series = [
      {
        name: "Clientes",
        data: []
      }
    ]
    let dataTable = []
    Cliente.find().sort({participacion: -1}).limit(10)
    .then(topClients => {
        for (let indexTwo = 0; indexTwo < topClients.length; indexTwo++) {
          categories.push(topClients[indexTwo].nombre)
          series[0].data.push(topClients[indexTwo].participacion)
          dataTable.push({Cliente: topClients[indexTwo].nombre, contacto: topClients[indexTwo].identidad, atencion: topClients[indexTwo].participacion})
        }
        res.json({series:series, categories: categories, dataTable: dataTable})
    })
})

metrics.get('/getTopTenBestClientsRecommendations', (req, res) => {
    let categories = []
    let series = [
      {
        name: "Clientes",
        data: []
      }
    ]
    let dataTable = []
    Cliente.find().sort({recomendaciones: -1}).limit(10)
    .then(topClients => {
        for (let indexTwo = 0; indexTwo < topClients.length; indexTwo++) {
          categories.push(topClients[indexTwo].nombre)
          series[0].data.push(topClients[indexTwo].recomendaciones)
          dataTable.push({Cliente: topClients[indexTwo].nombre, contacto: topClients[indexTwo].identidad, recomendaciones: topClients[indexTwo].recomendaciones})
        }
        res.json({series: series, categories:categories, dataTable: dataTable})
    })
})

module.exports = metrics
