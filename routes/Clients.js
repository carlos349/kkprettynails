const express = require('express');
const clients = express.Router()
const cors = require('cors');
const Cliente = require('../models/Cliente')

clients.use(cors())

clients.get('/', async (req, res) => {
    const Clients = await Cliente.find().sort({participacion: -1})
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

module.exports = clients