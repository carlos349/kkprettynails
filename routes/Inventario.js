const express = require('express');
const inventory = express.Router()
const cors = require('cors');
const Inventory = require('../models/Inventario')
const Servicio = require('../models/Servicios')
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
inventory.put('/updateProvider/:id', (req, res) => {
    Provider.findByIdAndUpdate(req.params.id, {
        $set: {
            nombre:req.body.name,
            rut:req.body.rut,
            contacto:req.body.contact,
            contactoAdicional:req.body.contactoPlus,
            ubicacion:req.body.ubicacion
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
    for (let i = 0; i < array.length; i++) {
        Inventory.findByIdAndUpdate(array[i].id, {
            $set: {
                cantidad:array[i].count,
                entry:0,
                consume:0
            }
        })
        .then(aver => {})
        var diferencia = parseFloat(array[i].count) - parseFloat(array[i].ideal)
        if (diferencia == 0) {
            array[i].diferencia = "Sin diferencia"
        }
        if (diferencia > 0) {
            array[i].diferencia = "+" + diferencia + " " + array[i].medida
        }
        if (diferencia < 0) {
            array[i].diferencia = diferencia + " " + array[i].medida
        }
    }
    
    const product = {
        fecha:date,
        user:req.body.user,
        totalProduct:array.length,
        array:array
    }
    History.create(product)
    .then(ready => {})   
    res.json({status: 'ok'})
    
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
        total:0,
        validAlert: false
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
inventory.delete('/deleteProvider/:id', async (req, res) => {
    const item = await Provider.findByIdAndDelete(req.params.id)
    if (item) {
        res.json({status: 'ok'})
    }
    res.json({status: 'bad'})
})

inventory.post('/deleteSale/:id', async (req, res) => {
    const item = await Inventory.findByIdAndDelete(req.params.id)
    if (item) {
        res.json({status: 'ok'})
    }
    res.json({status: 'bad'})
})

inventory.post('/procesarVenta', (req, res) => {
    var array = req.body.array
    for (let i = 0; i < array.length; i++) {
        Inventory.findByIdAndUpdate(array[i].id, {
            $inc: {consume:array[i].count }
        })
        .then(aver => {})
    }   
})

inventory.get('/alertProducts', (req, res) => {
    var productsToAlert = []
    Inventory.find()
    .then(products => {
        for (let index = 0; index < products.length; index++) {
            const product = products[index];
            const total = (parseFloat(product.entry) + parseFloat(product.cantidad)) - parseFloat(product.consume)
            if (product.type == "Mililitro(s)" && total <= 200) {
                productsToAlert.push({total: total, type: product.type, nameProduct: product.producto})
            }
            if(product.type == "Litros(s)" && total <= 2){
                productsToAlert.push({total: total, type: product.type, nameProduct: product.producto})
            }
            if(product.type == "Gramo(s)" && total <= 200){
                productsToAlert.push({total: total, type: product.type, nameProduct: product.producto})
            }
            if(product.type == "Kilogramo(s)" && total <= 2){
                productsToAlert.push({total: total, type: product.type, nameProduct: product.producto})
            }
            if(product.type == "Unidad" && total <= 5){
                productsToAlert.push({total: total, type: product.type, nameProduct: product.producto})
            }               
        }
        if (productsToAlert.length > 0) {
            res.json({status: true, productsToAlert: productsToAlert})
        }else{
            res.json({status: false})
        }
    })
    .catch(err => {
        res.send(err)
        console.log(err)
    })
})

inventory.post('/nullSale', (req, res) => {
    var array = req.body.array
    for (let i = 0; i < array.length; i++) {
        for (let e = 0; e < array[i].productos.length; e++) {
            Inventory.findByIdAndUpdate(array[i].productos[e].id, {
            $inc: {consume:-array[i].productos[e].count}
        })
        .then(aver => {})    
        }
    }   
})

module.exports = inventory