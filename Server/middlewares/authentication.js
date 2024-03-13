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
        req.user = {
            id: user.id,
            email: user.email
        }

        // next();

    } catch (error) {
        console.log(error);
        if(error.name === "Unauthenticated" || error.name === "JsonWebTokenError") {
            return res.status(401).json({message: "Invalid token"});
        }
        return res.status(500).json({ message: "Internal server error" })
        // next(error)
    }
}

module.exports = authentication;