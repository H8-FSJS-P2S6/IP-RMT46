const { User } = require("../models");
const { signToken } = require("../helpers/jwt");
const { comparePassword } = require("../helpers/bcrypt");

class Controller {
  static async login(req, res, next) {
    const { email, password } = req.body;
    try {
      if (!email) {
        throw { name: "ValidationError", message: "Email is required" };
      }
      if (!password) {
        throw { name: "ValidationError", message: "Password is required" };
      }
      const user = await User.findOne({
        where: { email },
      });
      if (!user) {
        throw { name: "Unauthorized", message: "Invalid email/password" };
      }

      const passwordMatch = comparePassword(password, user.password);
      if (!passwordMatch) {
        throw { name: "Unauthenticated", message: "Invalid email or password" };
      }

      const access_token = signToken({ id: user.id });
      res.status(200).json({ access_token: access_token });
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }
  static async register(req, res, next) {
    const { email, password } = req.body;

    try {
      if (!email) {
        throw { name: "ValidationError", message: "Email is required" };
      }
      if (!password) {
        throw { name: "ValidationError", message: "Password is required" };
      }
      const existingUser = await User.findOne({ where: { email: email } });
      if (existingUser) {
        throw { name: "ValidationError", message: "Email is already registered" };
      }

      const user = await User.create(req.body);
      res.status(201).json({
        id: user.id,
        email: user.email,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}

module.exports = Controller;
