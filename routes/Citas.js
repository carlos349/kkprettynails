const express = require('express');
const citas = express.Router()
const cors = require('cors');
const Citas = require('../models/Citas')
citas.use(cors())

citas.get('/', async (req, res) => {
  const citas = await Citas.find()
  res.json(citas)
})

module.exports = citas
