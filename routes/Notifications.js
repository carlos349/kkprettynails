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
notification.get('/noViews/:id', (req, res) => {
    Notifications.find().sort({date: -1}).limit(150)
    .then(getNotifications=>{
        if (getNotifications) {    
            let onlyYours = []
            for (let i = 0; i < getNotifications.length; i++) {
                const elementN = getNotifications[i];
                let inps = true
                for (let e = 0; e < getNotifications[i].views.length; e++) {
                    const element = getNotifications[i].views[e];
                    if (element == req.params.id) {
                        inps = false
                        break
                    }
                }
                if (inps) {
                    onlyYours.push(elementN)
                }
            }
            res.json(onlyYours)
        }
    })
    .catch(err=>{
        res.send(err)
    })
    
})  

notification.get('/validateViews/:id', (req, res) => {
    Notifications.find().sort({date: -1}).limit(150)
    .then(getNotifications=>{
        
        if (getNotifications) {    
            let onlyYours = []
            for (let i = 0; i < getNotifications.length; i++) {
                const elementN = getNotifications[i];
                let inps = true
                
                for (let e = 0; e < getNotifications[i].views.length; e++) {
                    const element = getNotifications[i].views[e];
                    if (element == req.params.id) {
                        inps = false
                    }
                }
                
                if (inps) {
                    onlyYours.push(elementN)
                    Notifications.findByIdAndUpdate(elementN._id, { $push: { views: req.params.id }})
                    .then(push=>{})
                }
            }
            res.json(onlyYours)
        }
    })
    .catch(err=>{
        res.send(err)
    })
    
})

notification.get('/getAll', (req, res) => {
    Notifications.find().sort({date: -1}).limit(150)
    .then(getNotifications=>{
        res.json(getNotifications)
    })
    .catch(err=>{
        res.send(err)
    })
    
})

notification.post('/', (req, res) => {
    const data = {
        userName: req.body.userName,
        userImage: req.body.userImage,
        detail: req.body.detail,
        link: req.body.link,
        date: new Date(),
        views:['0']
    }
    Notifications.create(data)
    .then(createNoti => {
        res.json(data)
    })
})  
module.exports = notification