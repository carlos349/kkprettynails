const express = require('express');
const servicio = express.Router()
const cors = require('cors');

servicio.use(cors())
const Servicio = require('../models/Servicios')

servicio.get('/', async (req,res) => {
  const servicios = await Servicio.find()
  res.json(servicios)
})

servicio.post('/', (req,res) => {
  const dataServicios = {
    nombre:req.body.nombreServicio,
    precio:req.body.precioServicio
  }
  Servicio.findOne({
    nombre: req.body.nombreServicio
  })
  .then(servicio => {
    if (!servicio) {
      Servicio.create(dataServicios)
      .then(servicio => {
        res.json({status:"Servicio creado"})
      })
      .catch(err => {
        res.send("Error: " + err)
      })
    }
    else{
      res.json({status:"Servicio repetido"})
    }
  })
  .catch(err => {
    res.send("Error: " + err)
  })
})

servicio.delete('/:id', async (req, res) => {
    await Servicio.findByIdAndRemove(req.params.id);
    res.json({
      status: 'Servicio eliminado'
    })
})

servicio.put('/:id', (req, res) => {
    Servicio.findByIdAndUpdate(req.params.id, {
      $set: {
        nombre: req.body.nombre,
        precio: req.body.precio
      }
    })
    .then(servicio => {
      res.json({status: 'Servicio actualizado'})
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

module.exports = servicio
