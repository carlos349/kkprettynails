const express = require('express');
const clients = express.Router()
const cors = require('cors');
const Cliente = require('../models/Cliente')

clients.use(cors())

clients.get('/', async (req, res) => {
    const Clients = await Cliente.find().sort({ultimaFecha: -1})
    res.json(Clients)
})

clients.get('/bestClient', async (req, res) => {
    const Clients = await Cliente.find().sort({participacion: -1})
    res.json(Clients)
})

clients.get('/mails', async (req, res) => {
    const Clients = await Cliente.find()
    res.json(Clients)
})

clients.post('/', (req, res) => {
    let recommender = req.body.recomendador
    let finalRecommender = ''
    if (recommender == '') {
        finalRecommender = 'Ninguno'
    }else{
        let reco = recommender.split("-")
        finalRecommender = reco[1]
    }
    const today = new Date()
    const ClienteData = {
        nombre: req.body.nombre,
        identidad: req.body.identidad,
        correoCliente:req.body.correoCliente,
        instagramCliente: req.body.instagramCliente,
        participacion: 0,
        recomendacion: finalRecommender,
        recomendaciones:0,
        ultimaFecha:today,
        fecha: today
    }

    Cliente.findOne({
        identidad: req.body.identidad
    })
    .then(cliente => {
        if (!cliente) {
            Cliente.create(ClienteData)
            .then(cliente => {
                if (recommender == '') {
                    res.json({status: 'Registrado'}) 
                }else{
                    Cliente.updateOne({identidad: finalRecommender}, {$inc: {recomendaciones: 1}})
                    .then(update => {
                        res.json({status: 'Registrado'}) 
                    })
                    .catch(err => {
                        res.send(err)
                    })
                }  
            })
            .catch(err => {
                res.send(err)
            })
        }else{
            res.json({error: 'Cliente ya existe'})
        }
    })
    .catch(err => {
        res.send(err)
    })
})

clients.put('/:id', async (req, res, next) => {
    try {
        const findClient = await Cliente.findOne({
            identidad:req.body.identidadClienteEditar
        })
        if (!findClient) {
            try {
                const updateClient = await Cliente.findByIdAndUpdate(req.params.id, {
                    $set: {
                      nombre:req.body.nombreClienteEditar,
                      identidad:req.body.identidadClienteEditar,
                      correoCliente: req.body.correoClienteEditar,
                      instagramCliente: req.body.instagramClienteEditar
                    }
                })
                if (updateClient) {
                    res.json({status: 'Servicio actualizado'})
                }
            } catch {
                res.send('error: ' + err)
            }
            
        }else{
            if (findClient._id == req.params.id) {
                try {
                    const updateClient = await Cliente.findByIdAndUpdate(req.params.id, {
                        $set: {
                          nombre:req.body.nombreClienteEditar,
                          identidad:req.body.identidadClienteEditar
                        }
                    })
                    if (updateClient) {
                        res.json({status: 'Servicio actualizado'})
                    }
                } catch {
                    res.send('error: ' + err)
                }
            }else{
                res.json({status: 'exist'})
            }
        }
    } catch {
        res.send('error: ' + err)
    }
    
})

clients.get('/getTopTenBestClients', (req, res) => {
    
    let chartdata = {
        labels: [],
        datasets: [ 
          {
            label: 'Top 10 mejores clientes',
            backgroundColor: 'rgba(31, 86, 115, .8)',
            data: []
          }
        ]
      }

    Cliente.find().sort({participacion: -1}).limit(10)
    .then(topClients => {
        for (let indexTwo = 0; indexTwo < topClients.length; indexTwo++) {
            chartdata.labels.push(topClients[indexTwo].nombre)
            chartdata.datasets[0].data.push(topClients[indexTwo].participacion)
          }
          res.json(chartdata)
    })
})

module.exports = clients