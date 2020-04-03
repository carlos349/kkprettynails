const express = require('express');
const inventory = express.Router()
const cors = require('cors');
const Inventory = require('../models/Inventario')
const Provider = require('../models/providers')
const History = require('../models/historyClosedInventory')
inventory.use(cors())

inventory.get('/', async (req, res) => {
    const products = await Inventory.find()
    res.json(products)
})
inventory.get('/getProvider', async (req, res) => {
    const provider = await Provider.find()
    res.json(provider)
})
inventory.get('/getHistory', async (req, res) => {
    const history = await History.find()
    res.json(history)
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
inventory.post('/closeInventory', (req, res) => {
    var array = req.body.array
    var date = new Date()
    History.findOne({
        mes: date.getMonth()
    })
    .then(done => {
        if (!done) {
            for (let i = 0; i < array.length; i++) {
                Inventory.findByIdAndUpdate(array[i].id, {
                $set: {
                    cantidad:array[i].count,
                    entry:0
                }
                })
                .then(aver => {})
                var diferencia = parseFloat(array[i].count) - parseFloat(array[i].ideal)
                if (diferencia == 0) {
                    diferencia = "Sin diferencia"
                }
                if (diferencia > 0) {
                    diferencia = "+" + diferencia + " Productos"
                }
                if (diferencia < 0) {
                    diferencia = diferencia + " Productos"
                }
                const product = {
                    medida:array[i].medida,
                    totalIdeal:array[i].ideal,
                    totalReal:array[i].count,
                    diferencia:diferencia,
                    mes:date.getMonth()
                }
                History.create(product)
                .then(ready => {})   
            }
            res.json({status: 'ok'})
        }
        else{
            res.json({status: 'exist'})
        }
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
        nombre: req.body.name,
        rut: req.body.rut,
        contacto : req.body.contacto,
        contactoAdicional: req.body.contactoPlus,
        ubicacion: req.body.direccion
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