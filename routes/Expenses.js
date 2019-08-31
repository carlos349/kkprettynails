const express = require('express');
const expenses = express.Router()
const cors = require('cors');
const Expenses = require('../models/Expenses')
expenses.use(cors())


expenses.get('/', async (req, res) => {
    const expenses = await Expenses.find()
    res.json(expenses)
})

expenses.post('/', (req, res) => {
    const expense = {
        expenses: req.body.expense,
        figure: 0
    }
    Expenses.findOne({
        expenses: req.body.expense
    })
    .then(back => {
        if (!back) {
            Expenses.create(expense)
            .then(back => {
                res.json({status: 'ok'})
            })
            .catch(err => {
                res.send(err)
            })
        }else{
            res.json({status: 'Gasto ya existe'})
        }
    })
    .catch(err => {
        res.send(err)
    })
})

expenses.get('/GetQuantity', (req, res) => {
    
})

module.exports = expenses
