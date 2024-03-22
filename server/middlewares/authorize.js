const { Content } = require('../models')

module.exports = {
    async authorization(req, res, next){
        try {
            const id = req.params.id

            const content = await Content.findByPk(id)

            if(!content) throw { name: 'Not Found' }

            if(content.UserId !== req.user.id && req.user.role !== 'admin') throw { name: 'Unauthorized' }

            next()
        } catch (error) {
            next(error)
        }
    }
}