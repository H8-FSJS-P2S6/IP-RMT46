const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");

async function authentication(req, res, next) {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            throw { name: "Unauthenticated" }
        }
        const [type, token] = authorization.split(" ");
        if (type !== "Bearer") {
            throw { name: "Unauthenticated" }
        }
        const payload = verifyToken(token);
        const user = await User.findByPk(payload.id)
        if (!user) {
            throw { name: "Unauthenticated" }
        }
        req.user = user;

        next();

    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = authentication;