const express = require('express');
const citas = express.Router()
const cors = require('cors');
const Citas = require('../models/Citas')
citas.use(cors())

citas.get('/', async (req, res) => {
  const citas = await Citas.find()
  res.json(citas)
})

citas.post('/', (req, res) => {
  const dataCitas = {
    start: req.body.entrada,
    end: req.body.salida,
    title: req.body.titulo,
    content: req.body.contenido
  }

  Citas.findOne({
    start: req.body.entrada,
    content: req.body.contenido
  })
  .then(citas => {
    if (!citas) {
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

module.exports = citas
