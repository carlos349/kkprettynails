const express = require('express');
const manicurista = express.Router()
const cors = require('cors');
const Manicurista = require('../models/Manicurista')
manicurista.use(cors())

manicurista.get('/', async (req, res) => {
  const manicuristas = await Manicurista.find()
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

module.exports = manicurista
