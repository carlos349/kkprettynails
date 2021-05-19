const express = require('express');
const citas = express.Router()
const cors = require('cors');
const Citas = require('../models/Citas')
const Cliente = require('../models/Cliente')
const closedDates = require('../models/closedDates')
const Manicurista = require('../models/Manicurista')
const email = require('../modelsMails/Mails')
citas.use(cors())
const multer = require('multer')
const { diskStorage } = require('multer')
const path = require('path')
const kmailCredentials = require('../private/kmail-credentials')
const KMails = new email(kmailCredentials)
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

citas.get('/availableslenders/:fecha', (req, res) => {

  const dateNow = new Date(req.params.fecha)
  const day = dateNow.getDay()
  const formatDate = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()
  dateNow.setDate(dateNow.getDate() + 1)
  const formatDateTwo = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()
  var arrayLenders = []
  Citas.find({date: {$gte: formatDate, $lte: formatDateTwo}}).sort({sort: 1})
  .then(citas => {
    const Dates = citas
    Manicurista.find()
    .then(lenders => {
      const Lenders = lenders
      for (let index = 0; index < Lenders.length; index++) {
        const element = Lenders[index];
        var valid = false
        var restTime = ''
        for (let index = 0; index < element.days.length; index++) {
          const elementFour = element.days[index];
          if (elementFour.day == day) {
            valid = true
            restTime = elementFour.hours[0]+'/'+elementFour.hours[1]
          }
        }
        if (valid) {
          arrayLenders.push({name: element.nombre, sort: 0, comission: element.comision, restTime: restTime})
        }
      }
      
      if (Dates.length > 0) {
        for (let i = 0; i < Dates.length; i++) {
          const elementTwo = Dates[i];
          for (let j = 0; j < arrayLenders.length; j++) {
            const elementThree = arrayLenders[j];
            if (elementTwo.employe == elementThree.name) {
              elementThree.sort = elementTwo.sort
            }
          }
        }
        console.log(arrayLenders)
        arrayLenders.sort((a, b) => {
          return a.comission - b.comission;
        });
        arrayLenders.sort((a, b) => {
          return a.sort - b.sort;
        });
        res.json({array: arrayLenders, day: day})
      }else{
        arrayLenders.sort((a, b) => {
          return a.comission - b.comission;
        });
        res.json({array: arrayLenders, day: day})
      }
    })
    .catch(err => {
      res.send(err)
    })
  }).catch(err => {
    res.send(err)
  })
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
    res.json({status: 'ok'})
  }catch(err){
    res.send(err)
  }
})

citas.post('/editBlocks', (req, res) => {
  const blocks = req.body.array
  const time = req.body.time
  const totalFor = parseFloat(time) / 15
  let first = 0
  for (let index = 0; index < blocks.length; index++) {
    const element = blocks[index];
    if (element.validator == 'select') {
      if (blocks[index + 1]) {
      if (blocks[index + 1].validator) {
        if (blocks[index + 1].validator == 'select') {
          element.validator = false
        }else{
          blocks[index].validator = true
        }
      }
    }
    }
  }
  for (let i = 0; i < blocks.length; i++) {
    const elementTwo = blocks[i];
    if (elementTwo.validator == false) {
      let count = 0
      for (let j = 0; j < totalFor; j++) {
        count = j == 0 ? parseFloat(i) - parseFloat(1) : parseFloat(count) - 1
        if (count >= 0) {
          if (blocks[count].validator == true) {
            blocks[count].validator = 'nDisponible'
          }
        }
      }
    }
  }

  for (let r = 0; r < blocks.length; r++) {
    const element = blocks[r];
    if (r+1 == blocks.length) {
      for (let t = 0; t < time/15; t++) {
        blocks[r-t].validator = 'nDisponible'
        
      }
    }
  }
  res.json(blocks)
})  

citas.post('/verifyDate', (req, res) => {
  const dataDate = req.body.dataDate
  const date = req.body.date
  const dateNow = new Date(date+' 1:00')
  const formatDate = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()
  dateNow.setDate(dateNow.getDate() + 1)
  const formatDateTwo = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()
  Citas.find({
    $and:[
      {date: {$gte: formatDate, $lte: formatDateTwo}}
    ]
  }).sort({sort:1})
  .then(dates => {
    if (dates.length > 0) {
      for (let i = 0; i < dataDate.serviceSelectds.length; i++) {
        var validFinally = false
        const element = dataDate.serviceSelectds[i];
        const datesData = []
        for (let o = 0; o < dates.length; o++) {
          const filter = dates[o];
          if (filter.employe == element.realLender) {
            datesData.push(filter)
          }
        }
        for (let r = 0; r < datesData.length; r++) {
          const elementTwo = datesData[r];
          var separ = elementTwo.start.split(':')
          var separTwo = elementTwo.end.split(':')
          var SumHours  = ((parseFloat(separTwo[0]) - parseFloat(separ[0])) * 60)
          var SumMinutes = parseFloat(separTwo[1]) - parseFloat(separ[1])
          var TotalMinutes = SumHours + SumMinutes
          const totalFor = TotalMinutes / 15
          var input, output
          var minutes = parseInt(separ[1])
          var hours = parseInt(separ[0])
          var blockDate = []
          for (let index = 0; index <= totalFor - 1; index++) {
            if (minutes == 0) {
              minutes = "00"
            }
            output = hours+":"+minutes
            if(index > 0){
              blockDate.push(output)
            }
            minutes = parseInt(minutes) + 15
            if (minutes == 60) {
              hours++
              minutes = "00"
            }
          }
          var valid = false
          for (let j = 0; j < element.blocks.length; j++) {
            const elementBlocks = element.blocks[j];
            if (elementBlocks.validator == 'select') {
              for (let l = 0; l < blockDate.length; l++) {
                const elementBlockDate = blockDate[l];
                if (elementBlockDate == elementBlocks.Horario) {
                  valid = true
                  break
                }
              }
            }
          }
          if (valid) {
            validFinally = true
            break
          }
        }
        if (validFinally) {
          break
        }
      }
      res.json({status: validFinally})
    }else{
      res.json({status: false})
    }
  }).catch(err => {
    res.send(err)
  })
})

citas.post('/editBlocksLenders', (req, res) => {
  const blocks = req.body.array
  const prevBlocks = req.body.prevBlocks
  const time = req.body.time
  const lender = req.body.lender
  const nBlocks = req.body.blocksNFirst
  const lendersService = req.body.lendersService
  const totalFor = parseFloat(time) / 15
  let first = false
  for (let index = 0; index < blocks.length; index++) {
    const element = blocks[index];
    if (prevBlocks[index].validator == 'select') {
      if (index == 0 || index == blocks.length - 1) {
        for (let j = 0; j < blocks[index].lenders.length; j++) {
          if (blocks[index].lenders[j].name == lender) {
            blocks[index].lenders.splice(j, 1)
          }
        }
        if (blocks[index].lenders.length == 0) {
          if (prevBlocks[index].origin && prevBlocks[index].origin == 'nDisponible') {
            element.validator = 'nDisponible'
          }
          else{
            element.validator = false
          }
        }
        else{
          element.validator = true
        }
      }
      else{
        if (first) {
          for (let j = 0; j < blocks[index].lenders.length; j++) {
            if (blocks[index].lenders[j].name == lender && prevBlocks[index+1].validator == 'select') {
              blocks[index].lenders.splice(j, 1)
            }
          }
          if (blocks[index].lenders.length == 0) {
            if (prevBlocks[index].origin && prevBlocks[index].origin == 'nDisponible') {
              element.validator = 'nDisponible'
            }
            else{
              element.validator = false
            }
          }
          else{
            element.validator = true
          }
        }
        else{
          for (let j = 0; j < blocks[index].lenders.length; j++) {
            if (blocks[index].lenders[j].name == lender) {
              blocks[index].lenders.splice(j, 1)
            }
          }
          element.validator = 'from'
        }
      }
      first = true 
    }
  }
  first = false
  if (nBlocks.length > 0) {
      for (let p = 0; p < nBlocks.length; p++) {
      const nBlock = nBlocks[p];
      for (let u = 0; u < nBlock.block.length; u++) {
        const nBlockTwo = nBlock.block[u];
        if (nBlockTwo.validator == 'select') {
          if (u == 0 || u == nBlock.block.length - 1) {
            for (let j = 0; j < blocks[u].lenders.length; j++) {
              if (blocks[u].lenders[j].name == nBlock.lender) {
                blocks[u].lenders.splice(j, 1)
              }
            }
            if (blocks[u].lenders.length == 0) {
              if (blocks[u].origin && blocks[u].origin == 'nDisponible') {
                blocks[u].validator = 'nDisponible'
              }
              else{
                blocks[u].validator = false
              }
            }
            else{
              blocks[u].validator = true
            }
          }
          else{
            if (first) {
              for (let j = 0; j < blocks[u].lenders.length; j++) {
                if (blocks[u].lenders[j].name == nBlock.lender && nBlock.block[u+1].validator == 'select') {
                  blocks[u].lenders.splice(j, 1)
                }
              }
              if (blocks[u].lenders.length == 0) {
                if (nBlockTwo.origin && nBlockTwo.origin == 'nDisponible') {
                  blocks[u].validator = 'nDisponible'
                }
                else{
                  blocks[u].validator = false
                }
              }
              else{
                blocks[u].validator = true
              }
            }
            else{
              for (let j = 0; j < blocks[u].lenders.length; j++) {
                if (blocks[u].lenders[j].name == nBlock.lender) {
                  blocks[u].lenders.splice(j, 1)
                }
              }
              blocks[u].validator = 'from'
            }
          }
          first = true 
        }
      }
    }
  }
  

  for (let j = 1; j < lendersService.length; j++) {
    const element = lendersService[j];
    for (let r = 0; r < blocks.length; r++) {
      const elementTwo = blocks[r];
      for (let l = 0; l < elementTwo.lenders.length; l++) {
        const elementThree = elementTwo.lenders[l];
        if (element.lender == elementThree.name) {
          elementThree.valid = true
        }
      }
    }
  }

  
  

  for (let j = 0; j < blocks.length; j++) {
    const block = blocks[j];
    if (block.validator == 'from') {
      for (let r = 0; r < totalFor; r++) {
        if (blocks[j-r]) {
          for (let i = 0; i < blocks[j - r].lenders.length; i++) {
            const prevBlock = blocks[j - r].lenders[i];
            if (prevBlock.name == lender) {
              blocks[j-r].lenders.splice(i, 1)
            }
          }
        } 
      }
      if (block.lenders == 0) {
        if (block.origin && block.origin == 'nDisponible') {
          block.validator = 'nDisponible'
        }
        else{
          block.validator = false
        }
      }
      else{
        block.validator = true
      }
    }
  }
  
  for (let i = 0; i < blocks.length; i++) {
    const elementTwo = blocks[i];
    if (elementTwo.validator == false) {
      let count = 0
      for (let j = 0; j < totalFor - 1; j++) {
        count = j == 0 ? parseFloat(i) - parseFloat(1) : parseFloat(count) - 1
        if (count >= 0) {
          if (blocks[count].validator == true) {
            blocks[count].validator = 'nDisponible'
            blocks[count].origin = 'nDisponible'
          }
        }
      }
    }
  }

  for (let r = 0; r < blocks.length; r++) {
    const element = blocks[r];
    if (r+1 == blocks.length) {
      for (let t = 0; t < time/15; t++) {
        blocks[r-t].validator = 'nDisponible'
        blocks[r-t].origin = 'nDisponible'
      }
    }
  }

  for (let index = 0; index < blocks.length; index++) {
    const element = blocks[index];
    if (element.validator != 'nDisponible') {
      if (element.lenders.length == 0) {
        element.validator = false
      }else{
        var valid = true
        for (let j = 0; j < element.lenders.length; j++) {
          const elementTwo = element.lenders[j];
          if (elementTwo.valid == true) {
            valid = false
          }
        }
        if (valid) {
          element.validator = false
        }
      }
    }
    
  }
  res.json(blocks)
}) 

citas.post('/editBlocksFirst', (req, res) => {
  const blocks = req.body.array
  const time = req.body.time
  const lender = req.body.lender
  const lendersService = req.body.lendersService
  const totalFor = parseFloat(time) / 15
  let first = false
  for (let index = 0; index < blocks.length; index++) {
    const element = blocks[index];
    if (blocks[index].validator == 'select') {
      if (index == 0 || index == blocks.length - 1 ) {
        for (let j = 0; j < blocks[index].lenders.length; j++) {
          if (blocks[index].lenders[j].name == lender) {
            blocks[index].lenders.splice(j, 1)
          }
        }
        if (blocks[index].lenders.length == 0) {
          if (blocks[index].origin && blocks[index].origin == 'nDisponible') {
            element.validator = 'nDisponible'
          }
          else{
            element.validator = false
          }
        }
        else{
          element.validator = true
        }
      }
      else{
        if (first) {
          for (let j = 0; j < blocks[index].lenders.length; j++) {
            if (blocks[index].lenders[j].name == lender && blocks[index+1] && blocks[index+1].validator == 'select') {
              blocks[index].lenders.splice(j, 1)
            }
          }
          if (blocks[index].lenders.length == 0) {
            if (blocks[index].origin && blocks[index].origin == 'nDisponible') {
              element.validator = 'nDisponible'
            }
            else{
              element.validator = false
            }
          }
          else{
            element.validator = true
          }
        }
        else{
          for (let j = 0; j < blocks[index].lenders.length; j++) {
            if (blocks[index].lenders[j].name == lender) {
              blocks[index].lenders.splice(j, 1)
            }
          }
          element.validator = 'from'
        }
      }
      first = true 
    }
  }
  var ifLender = false
  for (let j = 1; j < lendersService.length; j++) {
    const element = lendersService[j];
    for (let r = 0; r < blocks.length; r++) {
      const elementTwo = blocks[r];
      for (let l = 0; l < elementTwo.lenders.length; l++) {
        const elementThree = elementTwo.lenders[l];
        if (element.lender == elementThree.name) {
          elementThree.valid = true
        }
        if (element.lender == lender) {
          ifLender = true
        }
      }
    }
  }
  if (ifLender == false) {
    for (let u = 0; u < blocks.length; u++) {
      const elementTwoU = blocks[u];
      for (let y = 0; y < elementTwoU.lenders.length; y++) {
        const elementThreeY = elementTwoU.lenders[y];
        if (lender == elementThreeY.name) {
          elementThreeY.valid = false
        }
      }
    }
  }

  for (let j = 0; j < blocks.length; j++) {
    const block = blocks[j];
    if (block.validator == 'from') {
      for (let r = 0; r < totalFor; r++) {
        if (blocks[j-r]) {
          for (let i = 0; i < blocks[j - r].lenders.length; i++) {
            const prevBlock = blocks[j - r].lenders[i];
            if (prevBlock.name == lender) {
              blocks[j-r].lenders.splice(i, 1)
            }
          }
        } 
      }
      if (block.lenders == 0) {
        if (block.origin && block.origin == 'nDisponible') {
          block.validator = 'nDisponible'
        }
        else{
          block.validator = false
        }
      }
      else{
        block.validator = true
      }
    }
  }
  
  for (let i = 0; i < blocks.length; i++) {
    const elementTwo = blocks[i];
    if (elementTwo.validator == false) {
      let count = 0
      for (let j = 0; j < totalFor -1; j++) {
        count = j == 0 ? parseFloat(i) - parseFloat(1) : parseFloat(count) - 1
        if (count >= 0) {
          if (blocks[count].validator == true) {
            blocks[count].validator = 'nDisponible'
            blocks[count].origin = 'nDisponible'
          }
        }
      }
    }
  }
  
  for (let r = 0; r < blocks.length; r++) {
    const element = blocks[r];
    if (r+1 == blocks.length) {
      for (let t = 0; t < time/15; t++) {
        blocks[r-t].validator = 'nDisponible'
        blocks[r-t].origin = 'nDisponible'
      }
    }
  }
  for (let index = 0; index < blocks.length; index++) {
    const element = blocks[index];
    if (element.validator != 'nDisponible') {
      if (element.lenders.length == 0) {
        element.validator = false
      }else{
        var valid = true
        for (let j = 0; j < element.lenders.length; j++) {
          const elementTwo = element.lenders[j];
          if (elementTwo.valid == true) {
            valid = false
          }
        }
        if (valid) {
          element.validator = false
        }
      }
    }
    
  }
  
  res.json(blocks)
})  

citas.post('/getBlocksFirst', (req, res) => {
  const date = req.body.date
  const dateNow = new Date(date+' 1:00')
  const duration = req.body.time
  const lenders = req.body.lenders
  const lendersService = req.body.lendersService
  const blocks = []
  let dayNow = dateNow.getDay()
  let hourLast = ''
  if (dayNow == 6) {
    hourLast = 17
  }
  else{
    hourLast = 19
  }
  const formatDate = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()
  dateNow.setDate(dateNow.getDate() + 1)
  const formatDateTwo = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()

  var minutes = ((hourLast - 10) * 60) + 30
  const totalFor = minutes / 15
  var input, output
  minutes = 0
  var hours = 10
  for (let index = 0; index <= totalFor; index++) {
    if (minutes == 0) {
      minutes = "00"
    }
    output = hours+":"+minutes
    blocks.push({Horario:output , validator: true, lenders: []})
    minutes = parseInt(minutes) + 15
    if (minutes == 60) {
      hours++
      minutes = "00"
    }
  }
  Citas.find({
    $and:[
      {date: {$gte: formatDate, $lte: formatDateTwo}}
    ]
  }).sort({sort:1})
  .then(dates => {
    var timelineBlock = []
    for (let j = 0; j < lenders.length; j++) {
      const elementTwo = lenders[j];
      const datesData = []
      for (let o = 0; o < dates.length; o++) {
        const filter = dates[o];
        if (filter.employe == elementTwo.name) {
          datesData.push(filter)
        }
      }
      timelineBlock.push({name: elementTwo.name, timeline: []})
      for (let index = 0; index < datesData.length; index++) {
        const element = datesData[index];
        if (elementTwo.name == element.employe) {
          if (element.start == "10:00") {
            var count = 0
            for (let c = 0; c < datesData.length; c++) {
              if (elementTwo.name == datesData[c].employe) {
                if (c == 0) {
                  timelineBlock[j].timeline.push([datesData[c].start, datesData[c].end, false])
                  timelineBlock[j].timeline.push([datesData[c].end])
                  countValid = 1
                }
                else {
                  timelineBlock[j].timeline[c+count].push(datesData[c].start, true)
                  timelineBlock[j].timeline.push([datesData[c].start, datesData[c].end, false])
                  timelineBlock[j].timeline.push([datesData[c].end])
                  count++
                }
              }
            }
          }else{
            var count = 1
            for (let c = 0; c < datesData.length; c++) {
              if (elementTwo.name == datesData[c].employe) {
                if (c == 0) {
                  timelineBlock[j].timeline.push(["10:00", datesData[c].start, true])
                  timelineBlock[j].timeline.push([datesData[c].start, datesData[c].end, false])
                  timelineBlock[j].timeline.push([datesData[c].end])
                  countValid = 1
                }else {
                    timelineBlock[j].timeline[c+count].push(datesData[c].start, true)
                    timelineBlock[j].timeline.push([datesData[c].start, datesData[c].end, false])
                    timelineBlock[j].timeline.push([datesData[c].end])
                    count++
                }
              }
            }
          }
        }
        break
      }
    }
    for (let index = 0; index < timelineBlock.length; index++) {
      const element = timelineBlock[index];
      if (element.timeline.length > 0) {
        for (let j = 0; j < element.timeline.length; j++) {
          const elementTwo = element.timeline[j];
          if (elementTwo.length == 3) {
            separ = elementTwo[0].split(':')
            separTwo = elementTwo[1].split(':')
            SumHours  = ((parseFloat(separTwo[0]) - parseFloat(separ[0])) * 60)
            SumMinutes = parseFloat(separTwo[1]) - parseFloat(separ[1])
            TotalMinutes = SumHours + SumMinutes
          }else{
            separ = elementTwo[0].split(':')
            SumHours = ((19 - parseFloat(separ[0])) * 60)+ 30  
            SumMinutes = 0 - parseFloat(separ[1])
            TotalMinutes = SumHours + SumMinutes
            last = true
          }
          const totalFor = parseInt(TotalMinutes / 15)
          for (let c = 0; c < blocks.length; c++) {
            const elementThree = blocks[c];
            if (elementThree.Horario == elementTwo[0]) {
              if (elementTwo.length > 2) {
                if (elementTwo[2] == true) {
                  for (let u = 0; u < totalFor; u++) {
                    blocks[c+u].lenders.push({name: element.name, valid: false}) 
                  }
                }
              }else{
                  for (let u = c; u < blocks.length; u++) {
                    const elementFour = blocks[u];
                    elementFour.lenders.push({name: element.name, valid: false})
                  }
              }
            }
          }
        }
      }else{
        for (let j = 0; j < blocks.length; j++) {
          const elementTwo = blocks[j];
          elementTwo.lenders.push({name: element.name, valid: false})
        }
      }
    }

    
    for (let a = 0; a < lenders.length; a++) {
      const lender = lenders[a];
      var sepRes = lender.restTime.split('/')
      var insp = false
      for (let j = 0; j < blocks.length; j++) {
        const elementBlocks = blocks[j]
        if (sepRes[0] == elementBlocks.Horario) { 
          for (let l = 0; l < 1000; l++) {
            if (blocks[l+j].lenders.length > 0) {
              for (let r = 0; r < blocks[l+j].lenders.length; r++) {
                const element = blocks[l+j].lenders[r];
                if (lender.name == element.name) {
                  if (blocks[l+j].Horario != sepRes[1]) {
                    blocks[l+j].lenders.splice(r, 1)
                  }
                }
              } 
            }
            if (blocks[l+j].Horario == sepRes[1]) {
              insp = true
              break
            }
          }
        } 
        if (insp == true) {
          break
        }
      }
    }

    for (let j = 1; j < lendersService.length; j++) {
      const element = lendersService[j];
      for (let r = 0; r < blocks.length; r++) {
        const elementTwo = blocks[r];
        for (let l = 0; l < elementTwo.lenders.length; l++) {
          const elementThree = elementTwo.lenders[l];
          if (element.lender == elementThree.name) {
            elementThree.valid = true
          }
        }
      }
    }

    for (let index = 0; index < blocks.length; index++) {
      const element = blocks[index];
      if (element.lenders.length == 0) {
        element.validator = false
      }else{
        var valid = true
        for (let j = 0; j < element.lenders.length; j++) {
          const elementTwo = element.lenders[j];
          if (elementTwo.valid == true) {
            valid = false
          }
        }
        if (valid) {
          element.validator = false
        }
      }
    }

    for (let index = 0; index < lenders.length; index++) {
      const element = lenders[index];
      for (let j = 0; j < blocks.length; j++) {
        const elementTwo = blocks[j];
        var validEntry = true
        for (let r = 0; r < elementTwo.lenders.length; r++) {
          const elementThree = elementTwo.lenders[r];
          if (element.name == elementThree.name) {
            validEntry = false
            break
          }
        }
        if (validEntry) {
          var round = (duration / 15)
          for (var e = 1; e < round; e++) { 
            if (blocks[j-e]) {
              for (let i = 0; i < blocks[j - e].lenders.length; i++) {
                const elementFour = blocks[j - e].lenders[i];
                if (elementFour.name == element.name) {
                  blocks[j-e].lenders.splice(i, 1)
                }
              }
            } 
          }
        }
      }
    }

    for (var w = 0; w < blocks.length; w++) {
      if (blocks[w].validator == true) {
        var round2 = duration / 15
        if ( round2 < blocks.length - w ) {
          var round = (duration / 15)
          for (var e = 1; e < round; e++) {  
              if (blocks[w+e].validator == false ) {
                blocks[w].validator = 'nDisponible'
                blocks[w].origin = 'nDisponible'
              }   
          }
        }else{
          blocks[w].validator = 'nDisponible'
        }  
      }  
    }
    const daySelected = new Date(req.body.date).getMonth()
    const actualDay = new Date().getMonth()
    console.log(daySelected+"es igual a:"+ actualDay)
    if (daySelected == actualDay) {
      console.log("entro")
      const dateToday = new Date().getDate()
      const selectDay = new Date(req.body.date+' 1:00').getDate()
      if (dateToday == selectDay) {
        const hour = new Date().getHours() - 4

        for (var j = 0; j < blocks.length; j++) {
          const element = blocks[j]
          var split = element.Horario.split(':')[0]
          if (parseInt(split) < hour) {
            element.validator = 'nDisponible'
            element.origin = 'nDisponible'
          }
        } 
      }
    }

    for (let index = 0; index < blocks.length; index++) {
      const element = blocks[index];
      if (element.lenders.length == 0 && element.validator != 'nDisponible') {
        element.validator = false
      }
      else{
        if (element.validator != 'nDisponible') {
          element.validator = false
          for (let y = 0; y < element.lenders.length; y++) {
            const elementL = element.lenders[y];
            if (elementL.valid) {
              element.validator = true
            }
          }
        }
        
      }
    }
    res.json({blocks: blocks})
  }).catch(err => {
    res.send(err)
  })
})

citas.post('/getBlocks', (req,res) => {
  const employe = req.body.employe
  const date = req.body.date
  const duracion= req.body.time
  const dateNow = new Date(date+' 1:00')
  const resTimes = req.body.resTime
  let dayNow = dateNow.getDay()
  let hourLast = 0
  if (dayNow == 6) {
    hourLast = 17
  }
  else{
    hourLast = 19
  }
  const sepRes = resTimes.split('/')
  const formatDate = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()

  dateNow.setDate(dateNow.getDate() + 1)
  const formatDateTwo = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()
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
      timelineBlock.push(["10:00",hourLast+":30",true])
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
        SumHours = ((parseFloat(hourLast) - parseFloat(separ[0])) * 60)+30
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
        }else {
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
    bloques.push({Horario:hourLast+":30" , validator: 'nDisponible'})
    var insp = false
    for (let j = 0; j < bloques.length; j++) {
      if (sepRes[0] == bloques[j].Horario) {
        
          for (let l = 0; l < 1000; l++) {
            if(l == 0){
              bloques[j+l].validator = true
            }else{
              bloques[j+l].validator = false
            }
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
    const daySelected = new Date(req.body.date).getMonth()
    const actualDay = new Date().getMonth()
    if (daySelected == actualDay) {
      const dateToday = new Date().getDate()
      const selectDay = new Date(req.body.date+' 1:00').getDate()
      if (dateToday == selectDay) {
        const hour = new Date().getHours() - 4

        for (var j = 0; j < bloques.length; j++) {
          const element = bloques[j]
          var split = element.Horario.split(':')[0]
          if (parseInt(split) < hour) {
            element.validator = 'nDisponible'
          }
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
  const dateID = new Date()
  const id = dateID.getTime()
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
    image: [],
    confirmationId: id,
    typepay: '',
    paypdf: '',
    type: 'system'
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
  Citas.updateMany({confirmationId: id}, {
    $set: {
      confirmation: true
    }
  })
  .then(citas => {
    if (citas) {
      Citas.find({confirmationId: id})
      .then(date => {
        const split = date[0].client.split(' / ')
        const splitDate = date[0].date.getDate() +"-"+(date[0].date.getMonth() + 1)+"-"+date[0].date.getFullYear()
        var services = ''
        var lenders = ''
        for (let index = 0; index < date.length; index++) {
          const element = date[index];
          if (index > 0) {
            services = services +' - '+element.services[0].servicio
            lenders = lenders +' - '+element.employe
            start = start+' - '+element.start+'Hrs'
          }else{
            services = element.services[0].servicio
            lenders = element.employe
            start = element.start+'Hrs '
          }
        }
        const mail = {
          from: "kkprettynails.syswa.net",
          to: 'kkprettynails@gmail.com',
          subject: 'Cita confirmada',
          html: `
          <div style="width: 80%;max-width:1000px;margin:auto;padding:0;text-align:center;">
                  <div style="width: 100%;height: 10vh;margin: auto;background-color: #181d81;box-shadow: 0 2px 5px 0 rgba(0,0,0,.14);padding: 10px;font-family: 'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#181d81;text-align:justify;-webkit-box-shadow: 0px 6px 8px -8px rgba(0,0,0,0.73);-moz-box-shadow: 0px 6px 8px -8px rgba(0,0,0,0.73);box-shadow: 0px 6px 8px -8px rgba(0,0,0,0.73);">
                      <div style="width: 80px;margin:auto;border-radius:55%;background-color:#f8f9fa;padding: 10px;">     
                          <img style="width: 100%;" src="${imgMails}syswa-isotipo.png" alt="Logo kkprettynails">
                      </div>
                  </div>
                  <div style="width: 100%;margin: auto;padding-top: 5%;font-family: 'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#181d81;padding-bottom: 20px;padding-left:2px;">
                      <center>
                        <div style="width:100%;text-align: center;">
                          <h1 style="text-align: center;color:#181d81;">Información </h1>
                          <img style="height:80px;width:100px;margin-top:-20px;" src="${imgMails}logokk.png" alt="Logo kkprettynails">
                          <p style="text-align:center;margin-top:10px;font-size:16px;"> <strong>El cliente ${split[0]} ha confirmado su cita.</p> <br>
                          <p style="text-align:left;margin-top:10px;font-size:14px;font-weight: 300;"> 
                              <strong> Profesional: </strong> ${lenders}. <br>
                              <strong> Servicios:</strong> ${services}. <br>
                              <strong> Horarios de entrada:</strong> ${start}. <br>
                          </p>
                          <p style="text-align:left;margin-top:10px;font-size:16px;"> 
                            <img style="height:25px;width:25px;" src="${imgMails}calendar.png" alt="Logo kkprettynails"> 
                            <b style="margin-top:-5px">${splitDate}</b> <br>
                            <img style="height:25px;width:25px;" src="${imgMails}market.png" alt="Logo kkprettynails"><a style="text-align:center;font-size:16px;" href="https://goo.gl/maps/m5rVWDEiPj7q1Hxh9"><b style="font-family: 'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#181d81;font-size:16px;margin-top:-5px"> Av. Pedro de Valdivia 3474 Caracol Ñuñoa, Local 53-B Ñuñoa, Chile. </b></a>   <br>
                          </p>
                          
                        <div>
                      </center>
                  </div>
              </div>
          `
        }

        const mailTwo = {
          from: "kkprettynails.syswa.net",
          to: split[1],
          subject: 'Cita confirmada',
          html: `
          <div style="width: 80%;max-width:1000px;margin:auto;padding:0;text-align:center;">
                  <div style="width: 100%;height: 10vh;margin: auto;background-color: #181d81;box-shadow: 0 2px 5px 0 rgba(0,0,0,.14);padding: 10px;font-family: 'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#181d81;text-align:justify;-webkit-box-shadow: 0px 6px 8px -8px rgba(0,0,0,0.73);-moz-box-shadow: 0px 6px 8px -8px rgba(0,0,0,0.73);box-shadow: 0px 6px 8px -8px rgba(0,0,0,0.73);">
                      <div style="width: 80px;margin:auto;border-radius:55%;background-color:#f8f9fa;padding: 10px;">     
                          <img style="width: 100%;" src="${imgMails}syswa-isotipo.png" alt="Logo kkprettynails">
                      </div>
                  </div>
                  <div style="width: 100%;margin: auto;padding-top: 5%;font-family: 'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#181d81;padding-bottom: 20px;padding-left:2px;">
                      <center>
                        <div style="width:100%;text-align: center;">
                          <h1 style="text-align: center;color:#181d81;">Información </h1>
                          <img style="height:80px;width:100px;margin-top:-20px;" src="${imgMails}logokk.png" alt="Logo kkprettynails">
                          <p style="text-align:left;margin-top:10px;font-size:16px;"> <strong>Hola ${split[0]}, le informamos que se ha confirmado su cita con éxito.</strong> <br> 
                          Si por algún motivo desea cambiar o cancelar su cita por favor comunicarnos a la brevedad para liberar la hora tomada. <br> Los detalles del agendamiento se encuentran espeficicados a continuación. <br>
                          </p> <br>
                          <p style="text-align:left;margin-top:10px;font-size:14px;font-weight: 300;"> 
                              <strong> Profesional: </strong> ${lenders}. <br>
                              <strong> Servicios:</strong> ${services}. <br>
                              <strong> Horarios de entrada:</strong> ${start}. <br>
                          </p>
                          <p style="text-align:left;margin-top:10px;font-size:16px;"> 
                            <img style="height:25px;width:25px;" src="${imgMails}calendar.png" alt="Logo kkprettynails"> 
                            <b style="margin-top:-5px">${splitDate}</b> <br>
                            <img style="height:25px;width:25px;" src="${imgMails}market.png" alt="Logo kkprettynails"><a style="text-align:center;font-size:16px;" href="https://goo.gl/maps/m5rVWDEiPj7q1Hxh9"><b style="font-family: 'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#181d81;font-size:16px;margin-top:-5px"> Av. Pedro de Valdivia 3474 Caracol Ñuñoa, Local 53-B Ñuñoa, Chile. </b></a>   <br>
                          </p>
                          
                        <div>
                      </center>
                  </div>
                  <div style="width: 100%;background-color: #f0f1f3;box-shadow: 0 2px 5px 0 rgba(0,0,0,.14);margin: auto;font-family: 'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#181d81;padding-bottom:8px;-webkit-box-shadow: 0px -4px 11px 0px rgba(0,0,0,0.12);-moz-box-shadow: 0px -4px 11px 0px rgba(0,0,0,0.12);box-shadow: 0px -4px 11px 0px rgba(0,0,0,0.12);">
                    <center>
                    <div style="width:100%;">
                        <center>
                        <p style="text-align:center;font-size:14px;"><strong> Contáctanos</strong></p>
                          <a  href="mailto:kkprettynails@gmail.com" style="margin-left:40px;text-decoration:none;"> 
                            <img style="width:4%;" src="${imgMails}mail.png" alt="Logo mail">
                          </a>
                          <a  href="https://www.instagram.com/kkprettynails/" style="margin-left:40px;text-decoration:none;">
                            <img style="width:4%;" src="${imgMails}ig.png" alt="Logo ig">
                          </a>
                          <a  href="https://api.whatsapp.com/send?phone=56972628949&text=&source=&data=&app_absent=" style="margin-left:20px;text-decoration:none;">
                            <img style="width:4%;" src="${imgMails}ws.png" alt="Logo ws">
                          </a>
                          <a  href="https://kkprettynails.cl" style="margin-left:40px;text-decoration:none;">
                            <img style="width:4%;" src="${imgMails}web.png" alt="Logo web">
                          </a>
                        <br>
                        <a style="text-align:center;font-size:14px;" href="https://goo.gl/maps/m5rVWDEiPj7q1Hxh9"> Av. Pedro de Valdivia 3474 Caracol Ñuñoa, Local 53-B Ñuñoa, Chile.</a>
                        </center>
                    </div>
                    </center>
                </div>
              </div>
          `
        }
        try {
          KMails.sendMail(mail)
          try {
            KMails.sendMail(mailTwo)
            res.json({status: 'ok', data: date[0]})
          }catch(err){
            res.json({status: 'bad'})
            res.send(err)
          }
        }catch(err){
          res.json({status: 'bad'})
          res.send(err)
        }
        
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
      lender: req.body.lenders,
      payment: req.body.payment
  }
  
  for (let index = 0; index < req.body.service.length; index++) {
    const element = req.body.service[index].servicio;
    if (index > 0){
      data.services = data.services+' - '+element
    }else{
      data.services = element
    }
  }
  const split = data.date.split('-')
  const mail = {
    from: "kkprettynails.cl",
    to: data.contact,
    subject: 'Confirmacion de cita programada',
    html: `
    <div style="width: 80%;max-width:1000px;margin:auto; padding:0;text-align:center;">
            <div style="width: 100%;height: 10vh;margin: auto;background-color: #181d81;box-shadow: 0 2px 5px 0 rgba(0,0,0,.14);padding: 10px;font-family: 'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#181d81;text-align:justify;-webkit-box-shadow: 0px 6px 8px -8px rgba(0,0,0,0.73);-moz-box-shadow: 0px 6px 8px -8px rgba(0,0,0,0.73);box-shadow: 0px 6px 8px -8px rgba(0,0,0,0.73);">
                <div style="width: 80px;margin:auto;border-radius:55%;background-color:#fff;padding: 10px;">     
                    <img style="width: 100%;" src="${imgMails}syswa-isotipo.png" alt="Logo syswa">
                </div>
            </div>
            <div style="width: 100%;margin: auto;padding-top: 5%;font-family: 'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#181d81;padding-bottom: 20px;padding-left:10px;">
                <center>
                    <div style="width:100%;text-align: center;">
                        <h1 style="text-align: center;color:#181d81;">Bienvenid@ </h1>
                        <img style="height:80px;width:100px;margin-top:-20px;" src="${imgMails}logokk.png" alt="Logo kkprettynails">
                            <p style="text-align:center;margin-top:10px;font-size:16px;"> <strong>¡Hola ${data.name}! has generado la siguiente cita.</p>
                            
                            <p style="text-align:left;margin-top:10px;font-size:14px;font-weight: 300;"> 
                                <strong> Profesional: </strong> ${data.lender}. <br>
                                <strong> Servicios:</strong> ${data.services}. <br>
                                <strong> Horarios de entrada:</strong> ${data.start}. <br>
                            </p>
                            <p style="text-align:left;margin-top:10px;font-size:16px;"> 
                             <img style="height:25px;width:25px;" src="${imgMails}calendar.png" alt="Logo kkprettynails"> 
                            <b style="margin-top:-5px">${split[1]}-${split[0]}-${split[2]}</b> <br>
                            <img style="height:25px;width:25px;" src="${imgMails}payment.png" alt="Logo kkprettynails"> 
                            <b style="margin-top:-5px">${data.payment}</b> <br>
                            <img style="height:25px;width:25px;" src="${imgMails}market.png" alt="Logo kkprettynails"><a style="text-align:center;font-size:16px;" href="https://goo.gl/maps/m5rVWDEiPj7q1Hxh9"><b style="font-family: 'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#181d81;font-size:16px;margin-top:-5px"> Av. Pedro de Valdivia 3474 Caracol Ñuñoa, Local 53-B Ñuñoa, Chile. </b></a>   <br>
                            </p>
                        <center style="margin-top:40px;margin-bottom:30px;">
                            <a style="background-color:#181d81;font-size:18px;border:none;border-radius:14px;padding:10px;margin-bottom:30px;color:#fff;cursor:pointer;" href="http://kkprettynails.syswa.net/#/ConfirmacionAgenda?id=${id}">Confirmar</a>
                        </center>
                        <hr style="border-top: 1.5px solid #ffd4d8;">
                        <p style="text-align:left;margin-top:10px;font-size:14px;font-weight: 300;"> 
                            <strong>Al visitar nuestro local ten presente: </strong> <br><br>
                            1. Llegar con 15 minutos de anticipación. <br>
                            2. Para evitar restrasos en los servicios, no se atenderá una vez pasado los 15 minutos de la hora agendada.
                        </p>
                <div>
                </center>
            </div>
            <div style="width: 100%;background-color: #f0f1f3;box-shadow: 0 2px 5px 0 rgba(0,0,0,.14);margin: auto;font-family: 'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#181d81;padding-bottom:8px;-webkit-box-shadow: 0px -4px 11px 0px rgba(0,0,0,0.12);-moz-box-shadow: 0px -4px 11px 0px rgba(0,0,0,0.12);box-shadow: 0px -4px 11px 0px rgba(0,0,0,0.12);">
                <center>
                <div style="width:100%;">
                    <center>
                    <p style="text-align:center;font-size:14px;"><strong> Contáctanos</strong></p>
                      <a  href="mailto:kkprettynails@gmail.com" style="margin-left:40px;text-decoration:none;"> 
                        <img style="width:4%;" src="${imgMails}mail.png" alt="Logo mail">
                      </a>
                      <a  href="https://www.instagram.com/kkprettynails/" style="margin-left:40px;text-decoration:none;">
                        <img style="width:4%;" src="${imgMails}ig.png" alt="Logo ig">
                      </a>
                      <a  href="https://api.whatsapp.com/send?phone=56972628949&text=&source=&data=&app_absent=" style="margin-left:20px;text-decoration:none;">
                        <img style="width:4%;" src="${imgMails}ws.png" alt="Logo ws">
                      </a>
                      <a  href="https://kkprettynails.cl" style="margin-left:40px;text-decoration:none;">
                        <img style="width:4%;" src="${imgMails}web.png" alt="Logo web">
                      </a>
                    <br>
                    <a style="text-align:center;font-size:14px;" href="https://goo.gl/maps/m5rVWDEiPj7q1Hxh9"> Av. Pedro de Valdivia 3474 Caracol Ñuñoa, Local 53-B Ñuñoa, Chile.</a>
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

citas.post('/uploadPdf', upload.single('file'), (req, res, next) => {
  if (req.file) {
    res.json({nameFile: req.file.filename})
  }else{
    
  }
})

citas.post('/noOneLender',  (req, res) => {
  const dataCitas = []
  const dataDate = req.body.dataDate
  const client = req.body.client
  const date = new Date(req.body.date+' 10:00')
  var ClientAgend = ''
  if (req.body.ifClient) {
    ClientAgend = client.name+' '+client.lastName
  }else{
    ClientAgend = client.name
  }
  var nameFile = ''
  if (req.body.pdf == 'not') {
    nameFile = ''
  }else{
    nameFile = req.body.pdf
  }
  const dateID = new Date()
  const id = dateID.getTime()
  for (let index = 0; index < dataDate.serviceSelectds.length; index++) {
    const element = dataDate.serviceSelectds[index];
    var data = {
      start: element.start,
      end: element.end,
      sort: element.sort,
      date: date,
      services: [{servicio: element.servicio, comision: element.comision, precio: element.precio, discount:element.discount}],
      client: ClientAgend+ ' / '+client.mail+ ' / '+client.phone,
      employe: element.realLender,
      class: element.class,
      process: true,
      confirmation: false,
      image: [],
      confirmationId: id,
      typepay: client.pay,
      paypdf: nameFile,
      type: 'web',
    }
    dataCitas.push(data)
  }
  for (let i = 0; i < dataCitas.length; i++) {
    Citas.create(dataCitas[i])
    .then(citas => { 
    })
    .catch(err => {
      console.log(err)
    })
  }
  
  res.json({status: 'cita creada', id: id})
  
})

citas.delete('/:id', async (req, res) => {
  const citas = await Citas.findByIdAndRemove(req.params.id)
  res.json({
    status: 'Cita Eliminada'
  })
})

citas.post('/endDate/:id', (req, res) => {
  const id = req.params.id
  const splitTwo = req.body.client.split(' / ')[1]
  
  Cliente.find({identidad: splitTwo})
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
          Cliente.findOneAndUpdate({identidad: splitTwo}, {
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