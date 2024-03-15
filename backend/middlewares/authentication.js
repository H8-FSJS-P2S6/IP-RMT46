const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

async function Authentication(req, res, next) {
  try {
    let access_token = req.headers.authorization;
    // console.log(access_token);
    if (!access_token) {
      throw { name: "Unauthenticated" };
    }

    let [type, token] = access_token.split(" ");
    if (type !== "Bearer") {
      throw { name: "Unauthenticated" };
    }

    let payload = verifyToken(token);
    console.log(payload);

    let user = await User.findByPk(payload.id);
    //   console.log(user, "<<<user yang akses");
    if (!user) {
      throw { name: "Unauthenticated" };
    }

    req.user = {
      id: user.id,
      email: user.email,
    };
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = Authentication;
