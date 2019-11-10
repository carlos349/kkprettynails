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
  const timeleft = req.body.timeleft
  const dateNow = new Date(date)
  dateNow.setDate(dateNow.getDate() + 1)
  formatDate = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()

  dateNow.setDate(dateNow.getDate() + 1)
  const formatDateTwo = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()
  const arrayBlock = []
  Citas.find({
    $and:[
      {date: {$gte: formatDate, $lte: formatDateTwo}},
      {employe:employe}
    ]
  }).sort({start:-1})
  .then(citas => {
    let entrada = 0
    let salida =0
    let timelineBlock = []
    let timelineLast = []
    let duracion = timeleft / 15
    for (let c = 0; c < citas.length; c++) {
      if (c == 0) {
        timelineBlock.push([citas[c].end])
      }
      else {
        timelineBlock.push([citas[c].end])
        timelineBlock[c-1].push(citas[c].start)
      }
      
    }

   

    for (let index = 0; index < timelineBlock.length; index++) {
      var separ = timelineBlock[index][0].split([':'])
      
      var compare = separ[0] + ":" + separ[1]
      var bloq = []
      bloq.push(timelineBlock[index][0])
      for (let index = 0; index < duracion;index++ ) {
        if (separ[1] < 45 || separ[1] == 00 ) {
          separ[1] = parseFloat(separ[1] + 15)
          bloq.push(separ[0]+ ":" + separ[1])
          compare = separ[0]+ ":" + separ[1]
          
        }
        else{
          separ[0]++
          separ[1] = "00"
          bloq.push(separ[0]+ ":" + separ[1])
          compare = separ[0]+ ":" + separ[1]
        }
      }
      timelineLast.push(bloq)
     console.log(timelineLast)
    }

    console.log(timelineLast)
    res.send(timelineBlock)
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
  const DateSelect = new Date(req.body.fecha+" 10:00")
  const Datee = new Date(req.body.fecha+" 10:00")
  const dataCitas = {
    start: req.body.entrada,
    end: req.body.salida,
    date: Datee,
    services: req.body.servicios,
    client: req.body.cliente,
    employe: req.body.manicuristas
  }

  formatDate = DateSelect.getFullYear() +"-"+(DateSelect.getMonth() + 1)+"-"+DateSelect.getDate()

  DateSelect.setDate(DateSelect.getDate() + 1)
  const formatDateTwo = DateSelect.getFullYear() +"-"+(DateSelect.getMonth() + 1)+"-"+DateSelect.getDate()
    
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
