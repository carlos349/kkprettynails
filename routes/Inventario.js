const express = require('express');
const inventory = express.Router()
const cors = require('cors');
const Inventory = require('../models/Inventario')
const Provider = require('../models/providers')
inventory.use(cors())

inventory.get('/', async (req, res) => {
    const products = await Inventory.find()
    res.json(products)
})
inventory.get('/getProvider', async (req, res) => {
    const provider = await Provider.find()
    res.json(provider)
})
inventory.put('/:id', (req, res) => {
    Inventory.findByIdAndUpdate(req.params.id, {
        $set: {
            producto:req.body.product,
            type:req.body.type,
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
inventory.put('/add/:id', (req, res) => {
    
    Inventory.findByIdAndUpdate(req.params.id, {
        $inc: {entry:req.body.entry},
        $push:{history:req.body.history}
      })
      .then(servicio => {
          console.log(req.params.id)
        res.json({status: 'ok'})
      })
      .catch(err => {
        res.send('error: ' + err)
      })
})
inventory.post('/', (req, res) => {
    const product = {
        producto: req.body.product,
        type: req.body.type,
        cantidad: req.body.quantity,
        monto: req.body.price,
        entry: 0,
        consume:0,
        history:[],
        total:0
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
inventory.post('/addProvider', (req, res) => {
    const product = {
        nombre: req.body.name
    }
    
    Provider.findOne({
        nombre: req.body.name
    })
    .then(done => {
        if (!done) {
            Provider.create(product)
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