const express = require('express');
const inventory = express.Router()
const cors = require('cors');
const Inventory = require('../models/Inventario')
inventory.use(cors())

inventory.get('/', async (req, res) => {
    const products = await Inventory.find()
    res.json(products)
})
inventory.put('/:id', (req, res) => {
    const totalAmount = parseFloat(req.body.amount) * parseFloat(req.body.quantity) 
    Inventory.findByIdAndUpdate(req.params.id, {
        $set: {
            producto:req.body.product,
            marca:req.body.brand,
            gramos:req.body.grams,
            cantidad:req.body.quantity,
            monto:req.body.amount,
            montoTotal:totalAmount,
            servicios:req.body.services,
            serviciosId: req.body.serviceId
        }
      })
      .then(servicio => {
        res.json({status: 'ok'})
      })
      .catch(err => {
        res.send('error: ' + err)
      })
})

inventory.post('/', (req, res) => {
    const totalAmount = parseFloat(req.body.amount) * parseFloat(req.body.quantity)
    const product = {
        producto: req.body.product,
        marca: req.body.brand,
        gramos: req.body.grams,
        cantidad: req.body.quantity,
        monto: req.body.amount,
        montoTotal: totalAmount,
        servicios: req.body.services,
        serviciosId: req.body.servicesId,
        fecha: new Date()
    }
    
    Inventory.findOne({
        producto: req.body.product
    })
    .then(done => {
        if (!done) {
            Inventory.create(product)
            .then(ready => {
                res.json({status: 'ok'})
            })
            .catch(err => {
                res.send(err)
            })
        }else{
            res.json({status: 'exist'})
        }   
    })
    .catch(err => {
        res.send(err)
    })
})

module.exports = inventory