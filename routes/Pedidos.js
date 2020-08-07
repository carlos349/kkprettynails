const express = require('express');
const pedidos = express.Router()
const cors = require('cors');
const Pedido = require('../models/Pedidos')

const email = require('../modelsMails/Mails')
const Venta = require('../models/Venta')
const kmailCredentials = require('../private/kmail-credentials')
const smailCredentials = require('../private/smail-credentials')
const imgMails = require('../private/endpoints.js')

const KMails = new email(kmailCredentials)
const SMails = new email(smailCredentials)
pedidos.use(cors())

pedidos.post('/sendEmailPedido', async (req, res, next) => {
    var array = {}
    let mail = {}
    
        array = {
            to: req.body.to,
            code: req.body.code
        }
        
        mail = {
            from: "KKPrettynails",
            to: array.to,
            subject: 'Pedido verificado',
            html: `
            <div style="width: 100%; padding:0;text-align:center;">
                <div style="width: 85%;height: 8vh;margin: auto;background-color: #fdd3d7;box-shadow: 0 2px 5px 0 rgba(0,0,0,.14);padding: 20px;font-family: 'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#172b4d;text-align:justify;-webkit-box-shadow: 0px 6px 8px -8px rgba(0,0,0,0.73);-moz-box-shadow: 0px 6px 8px -8px rgba(0,0,0,0.73);box-shadow: 0px 6px 8px -8px rgba(0,0,0,0.73);">
                    <div style="width: 100px;margin:auto;border-radius:55%;background-color:#f8f9fa;padding: 10px;">     
                        <img style="width: 100%;" src="http://kkprettynails.cl/views/images/logokk.png" alt="Logo kkprettynails">
                    </div>
                </div>
                <div style="width: 100%;margin: auto;padding-top: 5%;font-family: 'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#172b4d;padding-bottom: 20px;">
                    <center>
                        <div style="width:60%;text-align: center;">
                            <h1 style="text-align: center;color:#172b4d;"> </h1>
                            <p style="text-align:center;margin-top:10px;font-size:18px;"> <strong>Su pedido fue validado con exito su codigo es:</p>
                            <p style="text-align:left;font-size:14px;font-weight: 300;text-align: center;width: 60%;margin:auto;"><strong> 
                                ${array.code}</strong>
                            </p>
                        <div>
                    </center>
                </div>
                <div style="width: 85%;background-color: #f0f1f3;box-shadow: 0 2px 5px 0 rgba(0,0,0,.14);margin: auto;padding: 20px;font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#172b4d;padding-bottom:20px;-webkit-box-shadow: 0px -4px 11px 0px rgba(0,0,0,0.12);-moz-box-shadow: 0px -4px 11px 0px rgba(0,0,0,0.12);box-shadow: 0px -4px 11px 0px rgba(0,0,0,0.12);">
                <center>
                <div style="width:60%;">
                    <center>
                    <p style="text-align:center;font-size:12px;"> +56 9 7262 8949 &nbsp;&nbsp;   kkprettynails@gmail.com</p> 
                    <p style="text-align:center;font-size:12px;">Contáctanos.</p>
                    <a href="https://kkprettynails.cl" style="text-decoration: none;color:#172b4d;" style="text-align:center;margin-top:12px;"><strong>kkprettynails.cl</strong></a>&nbsp;&nbsp;
                    <a href="https://www.instagram.com/kkprettynails/?hl=es-la" style="text-decoration: none;color:#172b4d;" style="text-align:center;margin-top:12px;"><strong>@kkprettynails</strong></a>
                    </center>
                </div>
                </center>
            </div>
            </div>
            `
        }
        
    
    
    
    try{
        const send = await KMails.sendMail(mail)
        console.log(send)
    }catch(err){
        res.send(err)
         console.log(err)
    }
})

pedidos.get('/', async (req, res) => {
    const pedidos = await Pedido.find().sort({ultimaFecha: -1})
    res.json(pedidos)
})

pedidos.get('/validCode', async (req, res) => {
    const pedidos = await Cliente.find().sort({participacion: -1})
    res.json(pedidos)
})

pedidos.get('/findOne/:id', async (req, res) => {
    const pedidos = await Cliente.findById(req.params.id)
    res.json(pedidos)
})

pedidos.get('/onlyData', async (req, res) => {
    const pedidos = await Cliente.find()
    res.json(pedidos)
})

pedidos.get('/countClient', async (req, res) => {
    const pedidos = await Cliente.find().count()
    res.json(pedidos)
})

pedidos.get('/mails', async (req, res) => {
    const pedidos = await Cliente.find()
    res.json(pedidos)
})

pedidos.post('/datesPerClient', async (req, res) => {
    const pedidos = await Citas.find({
        $and: [{client: {$regex: req.body.client}},{process:true}]
    })
    res.json(pedidos)
})

// pedidos.get('/historical/:data', async (req, res) => {
//     const split = req.params.data.split('-')
//     const data = split[0]+' / '+split[1]
//     console.log(data)
//     const historical = await Venta.find({})
// })

pedidos.get('/validCode/:code', async (req, res) => {
    const Pedid = await Pedido.findOne({codigo: req.params.code})
    res.json(Pedid)
})
pedidos.get('/useCode/:code', async (req, res) => {
    try {
        const updatePedido = await Pedido.findByIdAndUpdate(req.params.code, {
            $set: {
              estado:"usado"
            }
        })
        if (updatePedido) {
            res.json({status: 'ok'})
        }
    } catch(err) {
        res.send('error: ' + err)
    }
    
})
pedidos.put('/deleteClient/:id', async (req, res) => {
    const Client = await Cliente.findByIdAndDelete(req.params.id)
    if (Client) {
        res.json({status: 'ok'})
    }
    res.json({status: 'bad'})
})

pedidos.post('/verifyClient', (req, res) => {
    const data = {
        nombre: req.body.name,
        identidad: req.body.mail,
        correoCliente: req.body.number,
        instagramCliente: '',
        participacion: 0,
        recomendacion: '',
        recomendaciones: 0,
        historical: [],
        ultimaFecha: new Date(),
        fecha: new Date()
    }
    Cliente.findOne({identidad: data.identidad})
    .then(client => {
        if(client){
            res.json({status: 'ok', data: client})
        }else{
            Cliente.create(data)
            .then(ready => {
                res.json({status: 'bad', data: ready})
            })
            .catch(err => {
                res.send(err)
            })
        }
    })
    .catch(err => {
        res.send(err)
    })
})

pedidos.post('/', (req, res) => {
    var date = new Date()
    var codigo = date.getTime()
    
    const today = new Date()
    const pedidoData = {
        nombre: req.body.nombre,
        contacto: req.body.identidad,
        nPedido: '0',
        codigo:codigo,
        cliente: req.body.cliente,
        articulo: req.body.articulo,
        estado: "Nconfirmado",
        total: req.body.total,
        fecha: today
    }
    Pedido.find()
      .then(ifCount => {
        if (ifCount.length > 0) {
          Pedido.find().sort({nPedido: -1}).limit(1)
          .then(Count => {
            pedidoData.nPedido = parseFloat(Count[0].nPedido) + 1
            Pedido.create(pedidoData)
            .then(pedido => {
                res.json({status: 'Registrado'}) 
            })
            .catch(err => {

              res.send('Error:' + err)
            })
          })
          .catch(err => {
            res.send('Error:' + err)
          })
        }
        else{
            Pedido.create(pedidoData)
            .then(pedido => {
                res.json({status: 'Registrado'}) 
            })
            .catch(err => {

              res.send('Error:' + err)
            })
        }
      })
      .catch(err => {
        res.send('Error:' + err)
      })     
})

pedidos.put('/:id', async (req, res, next) => {
    try {
        const updatePedido = await Pedido.findByIdAndUpdate(req.params.id, {
            $set: {
              estado:"confirmado"
            }
        })
        if (updatePedido) {
            res.json({status: 'Servicio actualizado'})
        }
    } catch(err) {
        res.send('error: ' + err)
    }
    
})



module.exports = pedidos