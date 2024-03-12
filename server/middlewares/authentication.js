const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(req, res, next) {
    try {
        let access_token = req.headers.authorization;
        if (!access_token) {
            throw { name: "Unauthentication" }
        }

        let [type, token] = access_token.split(" ");
        if (type !== "Bearer") {
            throw { name: "Unauthentication" }
        }

        let payload = verifyToken(token);
        let user = await User.findByPk(payload.id);
        if (!user) {
            throw { name: "Unauthentication" }
        }

        req.user = {
            id: user.id,
            email: user.email,
            role: user.role,
        };
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = authentication;