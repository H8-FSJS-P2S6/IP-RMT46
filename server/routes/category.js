const express = require('express')
const { getCategory, getCategoryById, updateCategoryById, deleteCategoryById, createCategory } = require('../controllers/categoryController')
const { isAdmin } = require('../middlewares/isAdmin')
const router = express.Router()

router.get('/', getCategory)
router.get('/:id', getCategoryById)

router.use(isAdmin)

router.post('/', createCategory)
router.put('/:id', updateCategoryById)
router.delete('/:id', deleteCategoryById)

module.exports = router