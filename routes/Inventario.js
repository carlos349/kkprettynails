const express = require('express');
const inventory = express.Router()
const cors = require('cors');
const Inventory = require('../models/Inventario')
inventory.use(cors())

inventory.get('/', async (req, res) => {
    const products = await Inventory.find()
    res.json(products)
})

inventory.post('/', (req, res) => {
    
    const product = {
        producto: req.body.product,
        marca: req.body.brand,
        gramos: req.body.grams,
        cantidad: req.body.quantity,
        monto: req.body.amount,
        montoTotal: req.body.totalAmount,
        servicios: req.body.services,
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