const { Content, Category, User } = require('../models')

module.exports = class Controller {
    static async getContent(req, res, next) {
        try {
            let content = await Content.findAll(
                {
                    include: [
                        {
                            model: Category,
                            attributes: ['name']
                        },
                        {
                            model: User,
                            attributes: ['id', 'username', 'email']
                        }
                    ]

                })

            res.status(200).json(content)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async getContentById(req, res, next) {
        try {
            const id = req.params.id

            const content = await Content.findByPk(id, {
                include: 
                    {
                        model: Category,
                        attributes: ['name']
                    }
            })

            res.status(200).json(content)
        } catch (error) {
            next(error)
        }
    }

    static async createContent(req, res, next) {
        try {
            const { title, description, CategoryId } = req.body

            // console.log(title, description)

            let newContent = await Content.create({ title, description, CategoryId, UserId: req.user.id })

            // console.log(newContent.dataValues)
            res.status(201).json(newContent)
        } catch (error) {
            next(error)
        }
    }

    static async updateContentById(req, res, next) {
        try {
            const id = req.params.id

            let content = await Content.findByPk(id)

            const { title, description, CategoryId } = req.body

            await content.update({ title, description, CategoryId, UserId: req.user.id })

            res.status(200).json(content)

        } catch (error) {
            next(error)
        }
    }

    static async deleteContentById(req, res, next) {
        try {
            const id = req.params.id

            let content = await Content.findByPk(id)

            await content.destroy()

            res.status(200).json({ message: `Deleted content ${content.title}` })
        } catch (error) {
            next(error)
        }
    }
}