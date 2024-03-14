const jsonwebtoken = require("jsonwebtoken");
const secret = process.env.secret_jwt;
// console.log(process.env.secret_jwt);

function signToken(payload) {
  return jsonwebtoken.sign(payload, secret);
}

function verifyToken(token) {
  return jsonwebtoken.verify(token, secret);
}

module.exports = {
  signToken,
  verifyToken,
};