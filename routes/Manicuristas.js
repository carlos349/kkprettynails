const express = require('express');
const manicurista = express.Router()
const cors = require('cors');
const Manicurista = require('../models/Manicurista')
const Venta = require('../models/Venta')
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

module.exports = manicurista
