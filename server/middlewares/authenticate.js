const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

module.exports = {
    async authentication(req, res, next) {
        try {
            let access_token = req.headers.authorization
            if (!access_token) throw { name: 'Unauthenticated' }

            let [type, token] = access_token.split(' ')
            if(type !== 'Bearer') throw { name: 'Unauthenticated' }

            let payload = verifyToken(token)

            let user = await User.findByPk(payload.id)

            if(!user) throw { name: 'Unauthenticated' }

            req.user = {
                id: user.id,
                role: user.role
            }

            next()
        } catch (error) {
            // console.log(error)
            next(error)
        }
    }
}