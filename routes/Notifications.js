const express = require('express');
const notification = express.Router()
const cors = require('cors');
const Notifications = require('../models/Notifications')
const closedDates = require('../models/closedDates')

notification.use(cors())

notification.get('/', async (req, res) => {
    const getNotifications = await Notifications.find()
    if (getNotifications) {
        res.json(getNotifications)
    }
})  
notification.get('/onlyFive', async (req, res) => {
    const getNotifications = await Notifications.find().sort({date: -1}).limit(5)
    if (getNotifications) {
        res.json(getNotifications)
    }
})  

notification.post('/', (req, res) => {
    const data = {
        userName: req.body.userName,
        userImage: req.body.userImage,
        detail: req.body.detail,
        link: req.body.link,
        date: new Date()
    }
    Notifications.create(data)
    .then(createNoti => {
        res.json(data)
    })
})  
module.exports = notification