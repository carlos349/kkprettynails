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
            code: req.body.code,
            articulo:req.body.article,
            client:req.body.client
        }
        
        mail = {
            from: "KKPrettynails",
            to: array.to,
            subject: 'Pedido verificado',
            html: `
            <div style="width: 100%; padding:0;text-align:center;">
        <div style="width: 60%;height: 8vh;margin: auto;background-color: #fdd3d7;box-shadow: 0 2px 5px 0 rgba(0,0,0,.14);padding: 20px;font-family: 'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#172b4d;text-align:justify;-webkit-box-shadow: 0px 6px 8px -8px rgba(0,0,0,0.73);-moz-box-shadow: 0px 6px 8px -8px rgba(0,0,0,0.73);box-shadow: 0px 6px 8px -8px rgba(0,0,0,0.73);">
            <div style="width: 100px;margin:auto;border-radius:55%;background-color:#f8f9fa;padding: 10px;">     
                <img style="width: 100%;margin-bot:40px;" src="http://kkprettynails.cl/img/logokk.png" alt="Logo kkprettynails">
            </div>
        </div>
        <div style="width: 800px;margin: auto;padding-top: 5%;font-family: 'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#172b4d;padding-bottom: 20px;">
            <center>
                <div style="width:80%;text-align: center;">
                    <h1 style="text-align: center;color:#172b4d;"> </h1>
                    <p style="text-align:center;margin-top:10px;font-size:18px;"> <strong>Estimado(a) ${array.client} <br> Su pedido fue validado con éxito el código y detalles de su compra son los siguientes:</p>
                    <p style="text-align:left;font-size:14px;font-weight: 300;text-align: center;width: 60%;margin:auto;"><strong> 
                        
                        </strong>
                    </p>
                    <img style="width:100%;margin-bottom:-135px;" src="http://kkprettynails.cl/img/giftModelTop.png" alt="">
                    
                    <img style="width:40%;margin-left: 180px;" src="http://kkprettynails.cl/img/giftModelCenter.png" alt=""><img style="width:30%;" src="http://kkprettynails.cl/img/giftModelInfo.png" alt="">

                    <p style="font-weight: 400;font-size: 18px;color: #9ba5b1;"><b>De regalo por: </b>${array.articulo}</p>
                    <p style="font-weight: 400;font-size: 16px;color: #9ba5b1;display: inline-block;width: 395px;"><b>Dirección: </b>Av. Pedro de Valdivia 3474, local 53B, Ñuñoa, Región Metropolitana de Santiago</p>
                    <p style="font-weight: 400;font-size: 16px;color: #9ba5b1;background-color: #fcf8f7;padding: 10px;width: 200px;text-align: left;display: inline-block;"><b>Código: <br> </b>${array.code}</p>
                    <img style="width:100%;" src="http://kkprettynails.cl/img/giftModelBot.png" alt="">
                <div>
            </center>
        </div>
        <div style="width: 60%;background-color: #f0f1f3;box-shadow: 0 2px 5px 0 rgba(0,0,0,.14);margin: auto;padding: 20px;font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#172b4d;padding-bottom:20px;-webkit-box-shadow: 0px -4px 11px 0px rgba(0,0,0,0.12);-moz-box-shadow: 0px -4px 11px 0px rgba(0,0,0,0.12);box-shadow: 0px -4px 11px 0px rgba(0,0,0,0.12);">
                <center>
                <div style="width:60%;">
                    <center>
                    <p style="text-align:center;font-size:18px;">Contáctanos.</p>
                <a href="mailto:kkprettynails@gmail.com"><img style="width: 4%;" src="http://kkprettynails.cl/img/mail.png" alt=""></a>
                <a href="https://www.instagram.com/kkprettynails/?hl=es-la"><img style="width: 4.4%;margin-left:20px" src="http://kkprettynails.cl/img/ig.png" alt=""></a>
                <a href="https://wa.me/56972628949"><img style="width:4%;margin-left:20px" src="http://kkprettynails.cl/img/ws.png" alt=""></a>
                <a href="https://kkprettynails.cl"><img style="width: 4%;margin-left:20px" src="http://kkprettynails.cl/img/web.png" alt=""></a>
                <a  href="https://goo.gl/maps/m5rVWDEiPj7q1Hxh9" style="margin-left:20px;text-decoration:none;">
                    <img style="width:4%;margin-left:20px;" src="http://kkprettynails.cl/img/market.png" alt="Logo web">
                </a>
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
    const pedidos = await Pedido.find().sort({nPedido: -1})
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

pedidos.post('/datesPerClient', async (req, res) => {
    const pedidos = await Citas.find({
        $and: [{client: {$regex: req.body.client}},{process:true}]
    })
    res.json(pedidos)
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
        tipoPago:req.body.tipoPago,
        cliente: req.body.cliente,
        articulo: req.body.articulo,
        estado: "Nconfirmado",
        total: req.body.total,
        fecha: today
    }

    if (date.getDate() < 10) {
        var one = "0" + date.getDate()
    }
    else {
        var one = date.getDate()
    }
    if (date.getMonth() < 10 ) {
        var two = "0" + date.getMonth()
    }
    else{
        var two = date.getMonth()
    }
    var fechaCartelua = one+"-"+two+"-"+date.getFullYear()
    Pedido.find()
      .then(ifCount => {
        if (ifCount.length > 0) {
          Pedido.find().sort({nPedido: -1}).limit(1)
          .then(Count => {
            pedidoData.nPedido = parseFloat(Count[0].nPedido) + 1
            Pedido.create(pedidoData)
            .then(pedido => {
                res.json({status: 'Registrado',datos:pedido})
                var array = {}
                let mail = {}
                
                    array = {
                        to: req.body.identidad,
                        articulo:req.body.articulo,
                        client:req.body.cliente,
                        metodo:req.body.tipoPago,
                        datosMetodo:'',
                        metodoInfo:'',
                        total:req.body.total,
                        number:req.body.number
                    }
                    if (array.metodo == "Transferencia") {
                        array.datosMetodo = "Este pedido no será procesado hasta que sea transferido el total del pago y envíes la copia del comprobante a la dirección de correo indicada más abajo.";
                        array.metodoInfo = `<center>   
                        <div style="padding: 10px;border-radius: 5px;width: 60%;text-align: left;background-color: #fdd3d7;margin-top: 10px;">
                        <span style="font-weight: bold">Datos bancarios para la transferencia:</span>
                        <p>Nombre: Ángela Capacho <br> RUT: 26.125.092-6 <br>Tipo de cuenta: Corriente <br> Número de cuenta: 0-000-74-80916-2  <br> Banco: Banco Santander  <br> Email: kkprettynails@gmail.com <br> Comentario: *Por favor indicar el código del pedido*</p>
                        </div>
                    </center>`
                    }
                    else{
                        array.datosMetodo = `Este código tiene fecha de vencimiento de <b> 3 días hábiles </b> a pagar en la
                        siguiente dirección: <a href="https://goo.gl/maps/GhvcDBH1ppBDae1KA">
                        <p>Av. Pedro de Valdivia 3474, local 53B, Ñuñoa, Región Metropolitana de Santiago</p>
                        </a>`
                        array.metodoInfo = '';
                    } 
                    mail = {
                        from: "KKPrettynails",
                        to: array.to,
                        subject: 'Compra de Gift Card',
                        html: `
                        <div style="width: 100%; padding:0;text-align:center;">
                            <div style="width: 60%;height: 8vh;margin: auto;padding: 20px;font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#172b4d;text-align:justify">
                                <div style="width: 100px;margin:auto;border-radius:55%;background-color:#f8f9fa;padding: 10px;">     
                                    <img style="width: 100%;margin-bot:40px;" src="http://kkprettynails.cl/img/logokk.png" alt="Logo kkprettynails">
                                </div>
                            </div>
                            <div style="width: 100%;padding-top: 5%;font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#172b4d;padding-bottom: 40px;">
                                <center>
                                    <div style="width:60%;text-align: left;border-bottom: 3px solid #fdd3d7;">
                                        <p style="text-align:left;margin-top:10px;font-size:13px;"> Estimado(a) ${array.client}, <br> Hemos recibido una solicitud de compra por pagar en ${array.metodo}. Para realizar este pago debes
                                            presentar en caja el siguiente código: 000${pedidoData.nPedido}. </p>
                                        </div>
                                    <div style="width:60%;text-align: left;border-bottom: 3px solid #fdd3d7;"> <br>
                                        <p style="text-align:left;margin-top:10px;font-size:13px;"> <span style="font-weight: bold">Información importante:</span>  ${array.datosMetodo}
                                            </p>
                                    </div>
                                    ${array.metodoInfo}
                                    <div style="width:60%;text-align: left;"> <br>
                                        <p style="text-align:left;margin-top:10px;font-size:13px;"> <span style="font-weight: bold">A continuación te dejamos el detalle de tu compra: <br><br>
                                            Nombre: ${array.client} <br>
                                            Monto: ${array.total}<br>
                                            Código de compra: 000${pedidoData.nPedido} <br>
                                            Teléfono: ${array.number} <br>
                                            Email: ${array.to} <br>
                                            Fecha de compra: ${fechaCartelua} <br>
                                            </p>
                                    </div>

                                    <table style="padding: 10px;width:63%">
                                        <tr style="border-bottom: 3px solid #fdd3d7">
                                        <th style="padding: 10px;text-align: center;border-bottom: 3px solid #fdd3d7 !important;">ID</th>
                                        <th style="padding: 10px;text-align: center;border-bottom: 3px solid #fdd3d7 !important;">Producto</th>
                                        <th style="padding: 10px;text-align: center;border-bottom: 3px solid #fdd3d7 !important;">Compra</th>
                                        <th style="padding: 10px;text-align: center;border-bottom: 3px solid #fdd3d7 !important;">Valor</th>
                                        <th style="padding: 10px;text-align: center;border-bottom: 3px solid #fdd3d7 !important;">Cantidad</th>
                                        <th style="padding: 10px;text-align: center;border-bottom: 3px solid #fdd3d7 !important;">Subtotal</th>
                                        </tr>
                                        <tr>
                                        <td style="padding: 10px;text-align: center;">1</td>
                                        <td style="padding: 10px;text-align: center;">Gift Card</td>
                                        <td style="padding: 10px;text-align: center;">${array.articulo}</td>
                                        <td style="padding: 10px;text-align: center;">${array.total}</td>
                                        <td style="padding: 10px;text-align: center;">01</td>
                                        <td style="padding: 10px;text-align: center;">${array.total}</td>
                                        </tr>
                                    
                                        <tr>
                                        <td style="border-top: 3px solid #fdd3d7 !important;"></td>
                                        <td style="border-top: 3px solid #fdd3d7 !important;"></td>
                                        <td style="border-top: 3px solid #fdd3d7 !important;"></td>
                                        <td style="border-top: 3px solid #fdd3d7 !important;"></td>
                                        <td style="padding: 10px;text-align: center;border-top: 3px solid #fdd3d7 !important">Total:</td>
                                        <td style="padding: 10px;text-align: center;border-top: 3px solid #fdd3d7 !important">${array.total}</td>
                                        </tr>
                                    </table>
                                </center>
                            </div>
                            <div style="width: 100%;background-color: #f0f1f3;box-shadow: 0 2px 5px 0 rgba(0,0,0,.14);margin: auto;font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#181d81;padding-bottom:8px;-webkit-box-shadow: 0px -4px 11px 0px rgba(0,0,0,0.12);-moz-box-shadow: 0px -4px 11px 0px rgba(0,0,0,0.12);box-shadow: 0px -4px 11px 0px rgba(0,0,0,0.12);">
                                    <center>
                                    <div style="width:100%;">
                                        <center>
                                        <p style="text-align:center;font-size:14px;"><strong> Contáctanos</strong></p>
                                        <a  href="mailto:kkprettynails@gmail.com" style="margin-left:20px;text-decoration:none;"> 
                                            <img style="width:4%;" src="http://kkprettynails.cl/img/mail.png" alt="Logo mail">
                                        </a>
                                        <a  href="https://www.instagram.com/kkprettynails/" style="margin-left:20px;text-decoration:none;">
                                            <img style="width:4.4%;" src="http://kkprettynails.cl/img/ig.png" alt="Logo ig">
                                        </a>
                                        <a  href="https://api.whatsapp.com/send?phone=56972628949&text=&source=&data=&app_absent=" style="margin-left:20px;text-decoration:none;">
                                            <img style="width:4%;" src="http://kkprettynails.cl/img/ws.png" alt="Logo ws">
                                        </a>
                                        <a  href="https://kkprettynails.cl/inicio" style="margin-left:20px;text-decoration:none;">
                                            <img style="width:4%;" src="http://kkprettynails.cl/img/web.png" alt="Logo web">
                                        </a>
                                        <a  href="https://goo.gl/maps/m5rVWDEiPj7q1Hxh9" style="margin-left:20px;text-decoration:none;">
                                            <img style="width:4%;" src="http://kkprettynails.cl/img/market.png" alt="Logo web">
                                        </a>
                                        </center>
                                    </div>
                                    </center>
                                </div>
                        </div>
                        `
                    }
                    
                
                
                
                try{
                    const send =  KMails.sendMail(mail)
                    console.log(send)
                }catch(err){
                    res.send(err)
                    console.log(err)
                } 
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