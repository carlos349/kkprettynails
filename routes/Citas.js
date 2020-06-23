const express = require('express');
const citas = express.Router()
const cors = require('cors');
const Citas = require('../models/Citas')
const Cliente = require('../models/Cliente')
const closedDates = require('../models/closedDates')
const email = require('../modelsMails/Mails')
citas.use(cors())
const multer = require('multer')
const { diskStorage } = require('multer')
const path = require('path')
const mailCredentials = require('../private/mail-credentials')
const KMails = new email(mailCredentials)
const imgMails = require('../private/endpointsLogo.js')
const storage = diskStorage({
	destination: 'public/designs',
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname));
	}
})
const upload = multer({
	storage
})

citas.get('/', async (req, res) => {
  const citas = await Citas.find()
  res.json(citas)
})

citas.get('/getClients', async (req, res) => {
  const client = await Cliente.find()
  res.json(client)
})

citas.get('/endingdates', async (req, res) => {
  const client = await closedDates.find()
  res.json(client)
})

citas.get('/:employe', async (req, res) => {
  const citasByEmploye = await Citas.find({'employe': req.params.employe})
  res.json(citasByEmploye)
})

citas.get('/getDataToDate/:id', async (req, res) => {
  const citasById = await Citas.findById(req.params.id)
  res.json(citasById)
})

citas.put('/closeDate/:id', async (req, res) => {
  try {
    const closeDate = await Citas.findByIdAndUpdate(req.params.id, {
      $set: {process: false}
    })
    console.log(closeDate)
    res.json({status: 'ok'})
  }catch(err){
    res.send(err)
  }
})

citas.post('/getBlocks', (req,res) => {
  const employe = req.body.employe
  const date = req.body.date
  const duracion= req.body.time
  const dateNow = new Date(date+' 1:00')
  const resTimes = req.body.resTime
  
  const sepRes = resTimes.split('/')
  const formatDate = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()

  dateNow.setDate(dateNow.getDate() + 1)
  const formatDateTwo = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()
  console.log(formatDate)
  console.log(formatDateTwo)
  Citas.find({
    $and:[
      {date: {$gte: formatDate, $lte: formatDateTwo}},
      {employe:employe}
    ]
  }).sort({sort:1})
  .then(citas => {
    var timelineBlock = []
    var bloques = []
    if (citas.length == 0) {
      timelineBlock.push(["10:00","21:00",true])
    }else{
      if (citas[0].start == "10:00") {
        var count = 0
        for (let c = 0; c < citas.length; c++) {
          if (c == 0) {
            timelineBlock.push([citas[c].start, citas[c].end, false])
            timelineBlock.push([citas[c].end])
          }
          else {
            timelineBlock[c+count].push(citas[c].start, true)
            timelineBlock.push([citas[c].start, citas[c].end, false])
            timelineBlock.push([citas[c].end])
            count++
          }
        }
      }else{
        var count = 1
        for (let c = 0; c < citas.length; c++) {
          if (c == 0) {
            timelineBlock.push(["10:00", citas[c].start, true])
            timelineBlock.push([citas[c].start, citas[c].end, false])
            timelineBlock.push([citas[c].end])
          }else {
              timelineBlock[c+count].push(citas[c].start, true)
              timelineBlock.push([citas[c].start, citas[c].end, false])
              timelineBlock.push([citas[c].end])
              count++
          }
        }
      }
    }

    for (let index = 0; index < timelineBlock.length; index++) {
      var separ
      var separTwo
      var TotalMinutes 
      var SumHours
      var SumMinutes
      var last = false
      if (timelineBlock[index].length == 3) {
        separ = timelineBlock[index][0].split(':')
        separTwo = timelineBlock[index][1].split(':')
        SumHours  = ((parseFloat(separTwo[0]) - parseFloat(separ[0])) * 60)
        SumMinutes = parseFloat(separTwo[1]) - parseFloat(separ[1])
        TotalMinutes = SumHours + SumMinutes
      }else{
        separ = timelineBlock[index][0].split(':')
        SumHours = ((21 - parseFloat(separ[0])) * 60)  
        SumMinutes = 0 - parseFloat(separ[1])
        TotalMinutes = SumHours + SumMinutes
        last = true
      }
      const totalFor = parseInt(TotalMinutes / 15)
      var input, output
      var minutes = parseInt(separ[1])
      var hours = parseInt(separ[0])
      var prueba = hours+":"+minutes
      var ind = parseFloat(index) + parseFloat(1)
      for (let indexTwo = 0; indexTwo < totalFor; indexTwo++) {
        if (indexTwo == 0 && prueba != '10:0' && timelineBlock[index][2] == false) {
          if (minutes == 0) {
            minutes = "00"
          }
          output = hours+":"+minutes
          bloques.push({Horario:output , validator: 'nDisponible'})
          minutes = parseInt(minutes) + 15
          if (minutes == 60) {
            hours++
            minutes = "00"
          }
        }
        else {
          if (last) {
          if (minutes == 0) {
            minutes = "00"
          }
          output = hours+":"+minutes
          bloques.push({Horario:output , validator: true})
          minutes = parseInt(minutes) + 15
          if (minutes == 60) {
            hours++
            minutes = "00"
          }
        }else{
          if (minutes == 0) {
            minutes = "00"
          }
          output = hours+":"+minutes
          bloques.push({Horario:output , validator: timelineBlock[index][2]})
          minutes = parseInt(minutes) + 15
          if (minutes == 60) {
            hours++
            minutes = "00"
          }
          } 
        }
        
      } 
    }
    console.log(timelineBlock)
    console.log(bloques)
    bloques.push({Horario:'21:00' , validator: 'nDisponible'})
    var insp = false
    for (let j = 0; j < bloques.length; j++) {
      if (sepRes[0] == bloques[j].Horario) {
        bloques[j].validator = false
        for (let l = 0; l < 1000; l++) {
          bloques[j+l].validator = false
          if (bloques[j+l].Horario == sepRes[1]) {
            bloques[j+l].validator = true
            insp = true
            break
          }
          
        }
      } 
      if (insp == true) {
        break
      }
      
    }
    for (var w = 0; w < bloques.length; w++) {
        
      if (bloques[w].validator == true) {
        var round2 =duracion / 15
        if ( round2 < bloques.length - w ) {
          var round = (duracion / 15) +1
          for (var e = 1; e < round; e++) {  
              if (bloques[w+e].validator == false ) {
                bloques[w].validator = 'nDisponible'
                 
              }   
          }
        }else{
          bloques[w].validator = 'nDisponible'
        }  
      }  
    }
    
    res.json(bloques)
  })
  .catch(err => {
    res.send(err)
  })
})


citas.get('/prueba', (req, res) => {
  let a = new Date('2019-09-17 10:00')
  console.log(a)
})

citas.post('/getDateByMani', (req, res) => {
  const date = req.body.date
  const dateNow = new Date(date)
  formatDate = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()

  dateNow.setDate(dateNow.getDate() + 1)
  const formatDateTwo = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()
  
  const mani = req.body.mani
  Citas.find({
    date: { $gte: formatDate, $lte: formatDateTwo },
    employe: mani
  })
  .then(resp => {
    if (resp) {
      res.json(resp)
    }else{
      res.json({status: 'no date'})
    }
  })
})

citas.post('/', (req, res) => {
  const DateSelect = new Date(req.body.fecha+' 10:00')
  const dataCitas = {
    start: req.body.entrada,
    end: req.body.salida,
    sort:req.body.sort,
    date: DateSelect,
    services: req.body.servicios,
    client: req.body.cliente,
    employe: req.body.manicuristas,
    class: req.body.class,
    process: true,
    confirmation: false,
    image: []
  }
    
  Citas.create(dataCitas)
  .then(citas => {
    res.json({status: 'cita creada', id: citas._id })
  })
  .catch(err => {
    res.send('error: ' + err)
  })
    
})

citas.get('/confirmDate/:id', (req, res) => {
  const id = req.params.id

  Citas.findByIdAndUpdate(id, {
    $set: {
      confirmation: true
    }
  })
  .then(citas => {
    if (citas) {
      Citas.findById(id)
      .then(date => {
        res.json({status: 'ok', data: date})
      })
      .catch(err => {
        res.send('error: ' + err)
      })
    }
  })
  .catch(err => {
    res.send('error: ' + err)
  })
    
})

citas.post('/sendConfirmation/:id', (req, res) => {
  const id = req.params.id
  const data = {
      name: req.body.name,
      contact: req.body.contact,
      start: req.body.start,  
      end: req.body.end,
      date: req.body.date,
      services: '',
      lender: req.body.lenders
  }
  console.log(req.body.service)
  for (let index = 0; index < req.body.service.length; index++) {
    const element = req.body.service[index].servicio;
    if (index > 0){
      data.services = data.services+' - '+element
    }else{
      data.services = element
    }
  }
  const mail = {
    from: "kkprettynails.cl",
    to: data.contact,
    subject: 'Confirmacion de cita programada',
    html: `
    <div style="width: 100%; padding:0;text-align:center;">
            <div style="width: 85%;height: 8vh;margin: auto;background-color: #32325d;box-shadow: 0 2px 5px 0 rgba(0,0,0,.14);padding: 20px;font-family: 'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#32325d;text-align:justify;-webkit-box-shadow: 0px 6px 8px -8px rgba(0,0,0,0.73);-moz-box-shadow: 0px 6px 8px -8px rgba(0,0,0,0.73);box-shadow: 0px 6px 8px -8px rgba(0,0,0,0.73);">
                <div style="width: 80px;margin:auto;border-radius:55%;background-color:#f8f9fa;padding: 10px;">     
                    <img style="width: 100%;" src="${imgMails}syswa-isotipo.png" alt="Logo kkprettynails">
                </div>
            </div>
            <div style="width: 100%;padding: 20px;font-family: 'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#32325d;padding-bottom: 20px;">
                <center>
                    <div style="width:60%;text-align: center;">
                        <h1 style="text-align: center;color:#32325d;">Bienvenid@ </h1>
                        <img style="height:80px;width:100px;margin-top:-20px;" src="${imgMails}logokk.png" alt="Logo kkprettynails">
                            <p style="text-align:center;margin-top:10px;font-size:16px;"> <strong>Hola ${data.name} has generado la siguiente cita.</p>
                            <p style="text-align:left;margin-top:10px;font-size:16px;"> 
                            <strong> Día:</strong> ${data.date} <br>
                            <strong> Hora:</strong> ${data.start} Hrs <br>
                            </p>
                            <p style="text-align:left;margin-top:10px;font-size:14px;font-weight: 300;"> 
                                <strong> Profesional: </strong> ${data.lender}. <br>
                                <strong> Servicios:</strong> ${data.services}. <br>
                                <strong> Dirección:</strong> Av. Pedro de Valdivia 3474 Caracol Ñuñoa, Local 53-B Ñuñoa, Chile.
                            </p>
                        <center style="margin-top:40px;margin-bottom:30px;">
                            <a style="background-color:#32325d;font-size:18px;border:none;padding:10px;margin-bottom:30px;color:#fff;cursor:pointer;" href="http://syswa.net/#/ConfirmacionAgenda?id=${id}">Confirmar</a>
                        </center>
                        <p style="text-align:left;margin-top:10px;font-size:14px;font-weight: 300;"> 
                            <strong>Al visitar nuestro local ten presente: </strong> <br><br>
                            1. Llegar con 15 minutos de anticipación. <br>
                            2. Para evitar restrasos en los servicios, no se atenderá una vez pasado los 15 minutos de la hora agendada.
                        </p>
                <div>
                </center>
            </div>
            <div style="width: 85%;background-color: #f0f1f3;box-shadow: 0 2px 5px 0 rgba(0,0,0,.14);margin: auto;padding: 20px;font-family: 'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#32325d;padding-bottom:20px;-webkit-box-shadow: 0px -4px 11px 0px rgba(0,0,0,0.12);-moz-box-shadow: 0px -4px 11px 0px rgba(0,0,0,0.12);box-shadow: 0px -4px 11px 0px rgba(0,0,0,0.12);">
                <center>
                <div style="width:60%;">
                    <center>
                    <p style="text-align:center;font-size:14px;"> +56 9 7262 8949 &nbsp;&nbsp;   kkprettynails@gmail.com</p> 
                    <p style="text-align:center;font-size:14px;">Te atendemos de lunes a viernes de 9:00 a 18:30 hrs.</p>
                    </center>
                </div>
                </center>
            </div>
        </div>
    `
  }
  try {
    KMails.sendMail(mail)
    res.json({status: 'ok'})
  }catch(err){
    res.json({status: 'bad'})
    res.send(err)
  }
})

citas.post('/noOneLender', (req, res) => {
  const dataCitas = []
  const dataDate = req.body.dataDate
  const client = req.body.client
  const date = req.body.date
  for (let index = 0; index < dataDate.serviceSelectds.length; index++) {
    const element = dataDate.serviceSelectds[index];
    var data = {
      start: element.start,
      end: element.end,
      sort: element.sort,
      date: date,
      services: [{servicio: element.servicio, comision: element.comision, precio: element.precio}],
      client: client,
      employe: element.lender,
      class: element.class,
      process: true,
      confirmation: false,
      image: []
    }
    dataCitas.push(data)
  }
  for (let i = 0; i < dataCitas.length; i++) {
    Citas.create(dataCitas[i])
    .then(citas => {
      console.log('for'+citas)
    })
    .catch(err => {
      console.log(err)
    })
  }
  Citas.find().sort({_id:-1}).limit(1)
  .then(record => {
    console.log(record)
    res.json({status: 'cita creada', id: record[0]._id})
  })
  .catch(err => {
    res.send(err)
  })
})

citas.delete('/:id', async (req, res) => {
  const citas = await Citas.findByIdAndRemove(req.params.id)
  res.json({
    status: 'Cita Eliminada'
  })
})

citas.post('/endDate/:id', (req, res) => {
  const id = req.params.id

  const split = req.body.client.split('/')
  const splitTwo = split[1].split(' ')
  
  Cliente.find({identidad: splitTwo[1]})
  .then(cliente => {
    const ifRecomend = cliente[0].recomendaciones > 0 ? true : false
    const ifFirst = cliente[0].participacion == 0 ? true : false
    var discount = 0
    if (ifRecomend) {
      discount = 100 - 15
    }else if(ifFirst){
      discount = 100 - 10
    }
    var total = 0
    var comision = 0
    var comisionTotal = 0 
    for (let index = 0; index < req.body.services.length; index++) {
      let position = req.body.services[index]
      if (!position.descuento) {
        if (discount > 0) {
          comision = parseFloat(position.precio) * parseFloat('0.'+discount)
          comisionTotal = comision * parseFloat('0.'+position.comision) + comisionTotal
          total = total + position.precio
        }else{
          comision = position.precio 
          comisionTotal = comision * parseFloat('0.'+position.comision) + comisionTotal
          total = total + position.precio
        }
      }else{
          comision = parseFloat(position.precio) 
          comisionTotal = comision * parseFloat('0.'+position.comision) + comisionTotal
          total = total + position.precio
      }
    }

    var totalLocal = total - comisionTotal
    if (discount == 85) {
      discount = 15
    }else if(discount == 90){
      discount = 10
    }
    const data = {
      services: req.body.services,
      client: req.body.client,
      employe: req.body.employe,
      design: req.body.design,
      comision: comisionTotal,
      totalLocal: totalLocal,
      total: total + parseFloat(req.body.design),
      descuento: discount,
      date: new Date()
    }
    closedDates.create(data)
    .then(closed => {
      Citas.findByIdAndUpdate(id, {$set: {process: false}})
      .then(end => {
        if (discount == 85) {
          Cliente.findOneAndUpdate({identidad: splitTwo[1]}, {
            $inc: {recomendaciones: -1}
          })
          .then(recomend => {
            res.json({status:'ok'})
          })
          .catch(err => {
            res.send(err)
          })
        }else{
          res.json({status:'ok'})
        }
      })
      .catch(err => {
        res.send(err)
      })
    })
    .catch(err => {
      res.send(err)
    })
  })
  .catch(err => {
    res.send(err)
  })
})

citas.put('/uploadDesign/:id', upload.array('image', 3), (req, res) => {
  const images = []
  for (let index = 0; index < req.files.length; index++) {
    const element = req.files[index];
    images.push(element.filename)
  }
  if (req.body.imagePrev != '') {
    const split = req.body.imagePrev.split(',')
    for (let indexTwo = 0; indexTwo < split.length; indexTwo++) {
      const elementTwo = split[indexTwo];
      images.push(elementTwo)
    }
  }
  Citas.findByIdAndUpdate(req.params.id, {
    $set: {
      image: images
    }
  })
  .then(change => {
    res.json({status: 'ok', image: images})
  })
  .catch(err => {
    res.send(err)
    console.log(err)
  })
})

citas.put('/removeImage/:id', (req, res) => {
  const images = req.body.images
  Citas.findByIdAndUpdate(req.params.id, {
    $set: {
      image: images
    }
  })
  .then(change => {
    res.json({status: 'ok'})
  })
  .catch(err => {
    res.send(err)
  })
})

citas.put('/editDate/:id', async (req, res) => {
  const dateDate = new Date(req.body.fecha+' 10:00')
  const data = {
    entrada: req.body.entrada,
    salida: req.body.salida,
    sort: req.body.sort,
    fecha: dateDate,
    cliente: req.body.cliente,
    class: req.body.class,
    manicuristas: req.body.manicuristas,
  }
  console.log(data)
  const editDate = await Citas.findByIdAndUpdate(req.params.id, {
    $set: {
      start: data.entrada,
      end: data.salida,
      sort: data.sort,
      date:data.fecha,
      client: data.cliente, 
      class: data.class,
      employe: data.manicuristas
    }
  })
  if (editDate) {
    res.json({status: 'ok'})
  }
  res.json({status: 'bad'})
})



module.exports = citas
