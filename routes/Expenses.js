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
    const dataExpense = {
        expense: req.body.reason,
        type: "expense",
        figure: req.body.amount,
        date: req.body.dateSelect
    }
    Expenses.create(dataExpense)
    .then(expense => {
        res.json({status: 'ok'})
    })
    .catch(err => {
        res.send(err)
    })  
})


module.exports = expenses
