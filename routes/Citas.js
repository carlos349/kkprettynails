const express = require('express');
const citas = express.Router()
const cors = require('cors');
const Citas = require('../models/Citas')
const Cliente = require('../models/Cliente')
citas.use(cors())

citas.get('/', async (req, res) => {
  const citas = await Citas.find()
  res.json(citas)
})

citas.get('/getClients', async (req, res) => {
  const client = await Cliente.find()
  res.json(client)
})

citas.get('/:employe', async (req, res) => {
  const citasByEmploye = await Citas.find({'employe': req.params.employe})
  res.json(citasByEmploye)
})

citas.post('/getBlocks', (req,res) => {
  const employe = req.body.employe
  const date = req.body.date
  const dateNow = new Date(date)
  
  const formatDate = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()

  dateNow.setDate(dateNow.getDate() + 1)
  const formatDateTwo = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()
  
  Citas.find({
    $and:[
      {date: {$gte: formatDate, $lte: formatDateTwo}},
      {employe:employe}
    ]
  }).sort({sort:1})
  .then(citas => {
    
    var timelineBlock = []
    var bloques = []
    if (citas.length == 0) {
      timelineBlock.push(["10:00","21:00",true])
    }else{
      if (citas[0].start == "10:00") {
        for (let c = 0; c < citas.length; c++) {
          if (c == 0) {
            timelineBlock.push([citas[c].start, citas[c].end, false])
            timelineBlock.push([citas[c].end])
          }
          else {
            timelineBlock[c].push(citas[c].start, true)
            timelineBlock.push([citas[c].start, citas[c].end, false])
            timelineBlock.push([citas[c].end])
          }
        }
      }else{
        var count = 1
        for (let c = 0; c < citas.length; c++) {
          if (c == 0) {
            timelineBlock.push(["10:00", citas[c].start, true])
            timelineBlock.push([citas[c].start, citas[c].end, false])
            timelineBlock.push([citas[c].end])
          }else {
              timelineBlock[c+count].push(citas[c].start, true)
              timelineBlock.push([citas[c].start, citas[c].end, false])
              timelineBlock.push([citas[c].end])
              count++
          }
        }
      }
    }

    for (let index = 0; index < timelineBlock.length; index++) {
      var separ
      var separTwo
      var TotalMinutes 
      var SumHours
      var SumMinutes
      var last = false
      if (timelineBlock[index].length == 3) {
        separ = timelineBlock[index][0].split(':')
        separTwo = timelineBlock[index][1].split(':')
        SumHours  = ((parseFloat(separTwo[0]) - parseFloat(separ[0])) * 60)
        SumMinutes = parseFloat(separTwo[1]) - parseFloat(separ[1])
        TotalMinutes = SumHours + SumMinutes
      }else{
        separ = timelineBlock[index][0].split(':')
        SumHours = ((21 - parseFloat(separ[0])) * 60)  
        SumMinutes = 0 - parseFloat(separ[1])
        TotalMinutes = SumHours + SumMinutes
        last = true
      }
      const totalFor = parseInt(TotalMinutes / 15)
      var input, output
      var minutes = parseInt(separ[1])
      var hours = parseInt(separ[0])
      
      for (let indexTwo = 0; indexTwo < totalFor; indexTwo++) {
        if (last) {
          if (minutes == 0) {
            minutes = "00"
          }
          output = hours+":"+minutes
          bloques.push({Horario:output , validator: true})
          minutes = parseInt(minutes) + 15
          if (minutes == 60) {
            hours++
            minutes = "00"
          }
        }else{
          if (minutes == 0) {
            minutes = "00"
          }
          output = hours+":"+minutes
          bloques.push({Horario:output , validator: timelineBlock[index][2]})
          minutes = parseInt(minutes) + 15
          if (minutes == 60) {
            hours++
            minutes = "00"
          }
        } 
      } 
    }
    

    res.json(bloques)
  })
  .catch(err => {
    res.send(err)
  })
})


citas.get('/prueba', (req, res) => {
  let a = new Date('2019-09-17 10:00')
  console.log(a)
})

citas.post('/getDateByMani', (req, res) => {
  const date = req.body.date
  const dateNow = new Date(date)
  formatDate = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()

  dateNow.setDate(dateNow.getDate() + 1)
  const formatDateTwo = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()
  
  const mani = req.body.mani
  Citas.find({
    date: { $gte: formatDate, $lte: formatDateTwo },
    employe: mani
  })
  .then(resp => {
    if (resp) {
      res.json(resp)
    }else{
      res.json({status: 'no date'})
    }
  })
})

citas.post('/', (req, res) => {
  const DateSelect = new Date(req.body.fecha)
  
  const formatDate = DateSelect.getFullYear() +"-"+(DateSelect.getMonth() + 1)+"-"+DateSelect.getDate()

  const Datee = new Date(formatDate + " 10:00")
  const dataCitas = {
    start: req.body.entrada,
    end: req.body.salida,
    sort:req.body.sort,
    date: Datee,
    services: req.body.servicios,
    client: req.body.cliente,
    employe: req.body.manicuristas,
    class: req.body.class
  }
    
  Citas.create(dataCitas)
  .then(citas => {
    res.json({status: 'cita creada'})
  })
  .catch(err => {
    res.send('error: ' + err)
  })
    
})


citas.delete('/:id', async (req, res) => {
  const citas = await Citas.findByIdAndRemove(req.params.id)
  res.json({
    status: 'Cita Eliminada'
  })
})


module.exports = citas
