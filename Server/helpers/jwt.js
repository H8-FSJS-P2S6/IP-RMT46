const jsonwebtoken = require("jsonwebtoken");
const secret = process.env.JWT_SECRET

function signToken(payload){
    return jsonwebtoken.sign(payload, secret)
}

function verifyToken(token){
    return jsonwebtoken.verify(token, secret)
}

module.exports={
    signToken, 
    verifyToken
}