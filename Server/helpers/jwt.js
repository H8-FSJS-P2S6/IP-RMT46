const jsonwebtoken = require("jsonwebtoken")

const secret = process.env.JWT_SECRET;
const apiKey = process.env.SPOONACULAR_API_KEY;

function signToken(payload) {
    return jsonwebtoken.sign(payload, secret)
}

function verifyToken(token) {
    return jsonwebtoken.verify(token, secret)
}

module.exports = {
    signToken,
    verifyToken,
    apiKey
}