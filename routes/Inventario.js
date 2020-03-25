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
    Inventory.findByIdAndUpdate(req.params.id, {
        $set: {
            producto:req.body.product,
            cantidad:req.body.cantidad,
            monto:req.body.monto
        }
      })
      .then(servicio => {
        res.json({status: 'ok'})
      })
      .catch(err => {
        res.send('error: ' + err)
      })
})
inventory.put('/addMore/:id', (req, res) => {
    Inventory.findByIdAndUpdate(req.params.id, {
        $inc: {entry:req.body.entry}
      })
      .then(servicio => {
        res.json({status: 'ok'})
      })
      .catch(err => {
        res.send('error: ' + err)
      })
})
inventory.post('/', (req, res) => {
    const product = {
        producto: req.body.product,
        cantidad: req.body.quantity,
        monto: req.body.price,
        entry: 0,
        consume:0
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

inventory.put('/deleteItem/:id', async (req, res) => {
    const item = await Inventory.findByIdAndDelete(req.params.id)
    if (item) {
        res.json({status: 'ok'})
    }
    res.json({status: 'bad'})
})

module.exports = inventory