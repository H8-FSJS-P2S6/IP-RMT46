const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

module.exports = {
    async isAdmin(req, res, next) {
        try {
            let accessToken = req.headers.authorization

            if (!accessToken) throw { name: "Unauthenticated" }

            let [type, token] = accessToken.split(' ')
            if (type !== 'Bearer') throw { name: "Unauthenticated" }

            let payload = verifyToken(token)

            let user = await User.findByPk(payload.id)

            if (!user) throw { name: "Unauthenticated" }

            req.user = {
                role: user.role
            }


            if (req.user.role !== 'admin') {
                throw { name: "Unauthorized" }
            }

            next()
        } catch (error) {
            next(error)
        }
    }
}