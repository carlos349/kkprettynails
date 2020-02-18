const express = require('express');
const clients = express.Router()
const cors = require('cors');
const Cliente = require('../models/Cliente')
const email = require('../modelsMails/Mails')
const multer = require('multer')
const { diskStorage } = require('multer')
const path = require('path')
const storage = diskStorage({
	destination: 'public/mailsImage',
	filename: (req, files, cb) => {
		cb(null, Date.now() + path.extname(files.originalname));
	}
})
const upload = multer({
	storage:storage
})
const KMails = new email({
	host: 'smtp.gmail.com',
	port: '465',
	secure: true,
	auth: {
		type: 'login',
		user: 'carlos.gomes349@gmail.com',
		pass: '25430435carlos16'
	}
})
clients.use(cors())




clients.post('/sendmail', upload.array('image', 3),  async (req, res, next) => {
    var array = {}
    let mail = {}
    if (req.body.type == 1) {
        array = {
            to: req.body.to,
            from: req.body.from,
            subject: req.body.subject,
            image: req.files[0].filename
        }
        mail = {
            from: "kkprettynails",
            to: array.to,
            subject: array.subject,
            html: `<div>
                <center>
                    <img src="http://192.168.0.103:4200/static/mailsImage/${array.image}" alt="Imagen de correo">
                </center> 
            </div>`
        }
    }
    if (req.body.type == 2) {
        array = {
            to: req.body.to,
            from: req.body.from,
            subject: req.body.subject,
            text: req.body.text
        }
        mail = {
            from: "kkprettynails",
            to: array.to,
            subject: array.subject,
            html: `
            
            <div style="width: 50%;margin: auto;background-color: #ecebea;box-shadow: 0 2px 5px 0 rgba(0,0,0,.14);padding: 20px;">
                
                    ${array.text}
                    
                
            </div>`
        }
    }
    if (req.body.type == 3) {
        array = {
            to: req.body.to,
            from: req.body.from,
            subject: req.body.subject,
            text: req.body.text,
            image: req.files[0].filename
        }
        mail = {
            from: "kkprettynails",
            to: array.to,
            subject: array.subject,
            html: `<div style="width: 50%;margin: auto;background-color: #ecebea;box-shadow: 0 2px 5px 0 rgba(0,0,0,.14);padding: 20px;">
                    <center>
                       <img src="http://192.168.0.103:4200/static/mailsImage/${array.image}" alt="Imagen de correo"> 
                    </center>
                    
                ${array.text}
            </div>`
        }
    }
    if (req.body.type == 4) {
        array = {
            to: req.body.to,
            from: req.body.from,
            subject: req.body.subject,
            text: req.body.text,
            textTwo: req.body.textTwo,
            image: req.files[0].filename,
            imageTwo: req.files[1].filename,
            imageThree: req.files[2].filename
        }
        mail = {
            from: "kkprettynails",
            to: array.to,
            subject: array.subject,
            html: `<div style="width: 50%;margin: auto;background-color: #ecebea;box-shadow: 0 2px 5px 0 rgba(0,0,0,.14);padding: 20px;">
                    <center>
                       <img src="http://192.168.0.103:4200/static/mailsImage/${array.image}" alt="Imagen de correo"> 
                    </center>
                    
                ${array.text}

                <center>
                    <div style="display: inline-block;">
                        <img src="http://192.168.0.103:4200/static/mailsImage/${array.imageTwo}" alt="Imagen de correo2"> 
                        <img src="http://192.168.0.103:4200/static/mailsImage/${array.imageThree}" alt="Imagen de correo3"> 
                    </div>
                </center>
                ${array.textTwo}
            </div>`
        }
    }
    if (req.body.type == 5) {
        array = {
            to: req.body.to,
            from: req.body.from,
            subject: req.body.subject,
            text: req.body.text,
            image: req.files[0].filename,
        }
        mail = {
            from: "kkprettynails",
            to: array.to,
            subject: array.subject,
            html: `<div style="width: 50%;margin: auto;background-color: #ecebea;box-shadow: 0 2px 5px 0 rgba(0,0,0,.14);padding: 20px;">     
                ${array.text}
                <center>
                    <img src="http://192.168.0.103:4200/static/mailsImage/${array.image}" alt="Imagen de correo"> 
                 </center>
            </div>`
        }
    }
    console.log(req.body.type)
    if (req.body.type == 6) {
        array = {
            to: req.body.to,
            from: req.body.from,
            subject: req.body.subject,
            text: req.body.text,
            textTwo: req.body.textTwo,
            image: req.files[0].filename,
            imageTwo: req.files[1].filename,
            
        }
        
        mail = {
            from: "kkprettynails",
            to: array.to,
            subject: array.subject,
            html: `<div style="width: 50%;margin: auto;background-color: #ecebea;box-shadow: 0 2px 5px 0 rgba(0,0,0,.14);padding: 20px;">     
                <center>
                    <img src="http://192.168.0.103:4200/static/mailsImage/${array.image}" alt="Imagen de correo"> 
                 </center>
                 ${array.text}
                 <center>
                    <img src="http://192.168.0.103:4200/static/mailsImage/${array.imageTwo}" alt="Imagen de correo2"> 
                 </center>
                 ${array.textTwo}
            </div>`
        }
    }
    
    try{
        const send = await KMails.sendMail(mail)
        res.json({status: 'ok'})
    }catch(err){
        res.send(err)
    }
    
})

clients.get('/', async (req, res) => {
    const Clients = await Cliente.find().sort({ultimaFecha: -1})
    res.json(Clients)
})

clients.get('/bestClient', async (req, res) => {
    const Clients = await Cliente.find().sort({participacion: -1})
    res.json(Clients)
})

clients.get('/onlyData', async (req, res) => {
    const Clients = await Cliente.find()
    res.json(Clients)
})

clients.get('/mails', async (req, res) => {
    const Clients = await Cliente.find()
    res.json(Clients)
})

clients.get('/dataDiscount/:ident', async (req, res) => {
    const Client = await Cliente.find({identidad: req.params.ident})
    res.json(Client)
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
        participacion: req.body.ifCheck,
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
            } catch(err) {
                res.send('error: ' + err)
            }
            
        }else{
            if (findClient._id == req.params.id) {
                try {
                    const updateClient = await Cliente.findByIdAndUpdate(req.params.id, {
                        $set: {
                          nombre:req.body.nombreClienteEditar,
                          identidad:req.body.identidadClienteEditar,
                          correoCliente: req.body.correoClienteEdritar,
                          instagramCliente: req.body.instagramClienteEditar
                        }
                    })
                    if (updateClient) {
                        res.json({status: 'Servicio actualizado'})
                    }
                } catch(err) {
                    res.send('error: ' + err)
                }
            }else{
                res.json({status: 'exist'})
            }
        }
    } catch(err) {
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