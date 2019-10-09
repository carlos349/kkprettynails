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
  dateNow.setDate(dateNow.getDate() + 1)
  formatDate = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()

  dateNow.setDate(dateNow.getDate() + 1)
  const formatDateTwo = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()
  const arrayBlock = []
  const hoursPred = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true
]
  Citas.find({
    $and:[
      {date: {$gte: formatDate, $lte: formatDateTwo}},
      {employe:employe}
    ]
  })
  .then(citas => {
    console.log(citas)
    console.log(formatDate)
    console.log(formatDateTwo)
    let entrada = 0
    let salida =0

    for (let index = 0; index < citas.length; index++) {
      if (citas[index].start[0] == 8 || citas[index].start[0] == 9) {
        entrada = citas[index].start[0]
      }
      else{
        entrada = citas[index].start[0] + citas[index].start[1]
      }
      if (citas[index].end[0] == 9 ) {
        salida = citas[index].end[0]
      }
      else{
        salida = citas[index].end[0] + citas[index].end[1]
      }
      for (let c = 8; c < 21; c++) {
        if (entrada == c) { 
          
          for (let t = parseFloat(entrada); t <= parseFloat(salida) - 1; t++) {
            hoursPred[t] = false
            
          }
        }
        
      }
      
    }

    res.json(hoursPred)

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
