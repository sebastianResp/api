const express = require('express')
const router = express.Router()
const { createVisita, getVisita } = require('../controllers/visitas')


router.get('/', createVisita)


module.exports = router 