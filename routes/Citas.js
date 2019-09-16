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

citas.post('/', (req, res) => {
  const dataCitas = {
    start: req.body.entrada,
    end: req.body.salida,
    date: req.body.fecha,
    services: req.body.titulo,
    client: req.body.cliente,
    employe: req.body.contenido
  }

  Citas.findOne({
    start: req.body.entrada, //hora de entrada
    content: req.body.contenido //Empleada que hace el servicio
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
