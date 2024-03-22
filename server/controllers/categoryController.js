const { Category, Content } = require('../models')

module.exports = class Controller {
    static async getCategory(req, res, next) {
        try {
            let category = await Category.findAll({
                include: Content
            })

            res.status(200).json(category)
        } catch (error) {
            next(error)
        }
    }

    static async createCategory(req, res, next){
        try {
            const { name } = req.body

            let newCategory = await Category.create({name})

            res.status(201).json(newCategory)
        } catch (error) {
            next(error)
        }
    }

    static async getCategoryById(req, res, next) {
        try {
            const id = req.params.id

            let category = await Category.findByPk(id, {
                include: Content
            })

            res.status(200).json(category)
        } catch (error) {
            next(error)
        }
    }

    static async updateCategoryById(req, res, next) {
        try {
            const id = req.params.id

            let category = await Category.findByPk(id)

            const { name } = req.body

            let updtCategory = await category.update({name})

            res.status(200).json(updtCategory)
        } catch (error) {
            next(error)
        }
    }

    static async deleteCategoryById(req, res, next){
        try {
            const id = req.params.id

            let category = await Category.findByPk(id)

            await category.destroy()

            res.status(200).json({message: `${category.name} successfully deleted`})
        } catch (error) {
            next(error)
        }
    }
}