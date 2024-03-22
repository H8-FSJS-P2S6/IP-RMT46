const express = require('express')
const { getContent, createContent, updateContentById, deleteContentById, getContentById } = require('../controllers/contentController')
const { authorization } = require('../middlewares/authorize')
const router = express.Router()

router.get('/', getContent)
router.post('/', createContent)
router.get('/:id', authorization, getContentById)
router.put('/:id', authorization, updateContentById)
router.delete('/:id', authorization, deleteContentById)

module.exports = router