const express = require('express')
const { getData, getDataById } = require('../controllers/pubController')
const router = express.Router()

router.get('/', getData)
router.get('/:id', getDataById)

module.exports = router