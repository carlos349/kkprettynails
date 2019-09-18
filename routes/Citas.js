const express = require('express');
const citas = express.Router()
const cors = require('cors');
const Citas = require('../models/Citas')
const Clients = require('../models/Cliente')
citas.use(cors())

citas.get('/', async (req, res) => {
  const citas = await Citas.find()
  res.json(citas)
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

  const dataCitas = {
    start: req.body.entrada,
    end: req.body.salida,
    date: DateSelect,
    services: req.body.servicios,
    client: req.body.cliente,
    employe: req.body.manicuristas
  }

  formatDate = DateSelect.getFullYear() +"-"+(DateSelect.getMonth() + 1)+"-"+DateSelect.getDate()

  DateSelect.setDate(DateSelect.getDate() + 1)
  const formatDateTwo = DateSelect.getFullYear() +"-"+(DateSelect.getMonth() + 1)+"-"+DateSelect.getDate()
  
  Citas.findOne({
    $and: [
      {
        date: { $gte: formatDate, $lte: formatDateTwo }
      },
      {
        $or: [
          {
            start: { $gte: req.body.entrada, $lte: req.body.salida }
          },
          {
            end: { $gte: req.body.entrada, $lte: req.body.salida }
          }
        ]
      }, //hora de entrada
      {
        employe: req.body.manicuristas
      } //Empleada que hace el servicio
    ]
  })
  .then(citas => {
    if (!citas) { //sino encuentra alguna cita a esa hora y con esa empleada
      Citas.create(dataCitas)
      .then(citas => {
        res.json({status: 'cita creada'})
      })
      .catch(err => {
        res.send('error: ' + err)
      })
    }else{
      res.json({status: 'cita ocupada'})
    }
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

citas.get('/getClients', async (req, res) => {
  const client = await Clients.find()
  res.json(client)
})

module.exports = citas
