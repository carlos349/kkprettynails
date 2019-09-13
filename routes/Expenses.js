const express = require('express');
const expenses = express.Router()
const cors = require('cors');
const Expenses = require('../models/Expenses')
const Cierres = require('../models/Cierres')
expenses.use(cors())


expenses.get('/', async (req, res) => {
    const expenses = await Expenses.find()
    res.json(expenses)
})

expenses.post('/', (req, res) => {
    const expense = req.body.expense
    const dateSelect = req.body.dateSelect
    const dateNow = new Date(dateSelect)
    dateNow.setDate(dateNow.getDate() + 1)
    const formatDate = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()

    dateNow.setDate(dateNow.getDate() + 1)
    const formatDateTwo = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()
    console.log(formatDate)
    console.log(formatDateTwo)
    Cierres.findOneAndUpdate({fecha: { $gte: formatDate, $lte: formatDateTwo }},
        { $set : { gastos: expense }
    })
    .then(resp => {
        res.json({status: 'ok'})
    })
    .catch(err => {
        res.send(err)
    })

})


module.exports = expenses
