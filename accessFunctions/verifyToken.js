const express = require('express')
const protectRoute = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../private/key_jwt');
const User = require('../models/User')
protectRoute.use((req, res, next) => {
	const token = req.headers['x-access-token'];
	if (!token) {
		return res.status(401).json({auth: false, message: 'no token provided'})
	}
    jwt.verify(token, config.key, (err, decoded) => {
        if (err) {
            return res.status(401).json({auth: false, message: 'token expired'})
        }else{
            User.findById(decoded._id)
            .then(verify => {
                if (!verify) {
                    return res.status(401).json({auth: false, message: 'invalid access'})
                }else{
                    next();
                } 
            })
        }
    })
});

module.exports = protectRoute