const express = require('express')
const metrics = express.Router()
const cors = require('cors')

const Cliente = require('../models/Cliente')
const Venta = require('../models/Venta')

metrics.use(cors())


metrics.get('/top', async (req, res) => {
  const participacion = await Cliente.find().sort({participacion: -1}).limit(10)
  res.json(participacion)
})

metrics.get('/ventas', (req, res) => {
  Venta.find({
    fecha: {
      $gte: '2019-06-26T00:00:00.000+00:00',
      $lt: '2019-07-26T00:00:00.000+00:00'
    }
  })
  .then(fechas => {
    res.json({status: fechas.length})
  })
  .catch(err => {
    res.send(err)
  })
})


module.exports = metrics
