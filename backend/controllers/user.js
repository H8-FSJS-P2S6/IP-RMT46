const { User } = require("../models");
const { comparePassword } = require("../helpers/bycrypt");
const { signToken } = require("../helpers/jwt");

module.exports = class UserController {
  static async registerUserBasic(req, res, next) {
    try {
      const sso = false;
      const { email, password, phoneNumber, address } = req.body;
      if (!email || !password) {
        throw {
          name: "ErrorCustom",
          status: 400,
          message: "email/password cannot be empty!",
        };
      }
      const existingEmail = await User.findOne({
        where: { email: email },
      });
      if (existingEmail) {
        throw {
          name: "ErrorCustom",
          status: 409,
          message: "Email already exists!",
        };
      }

      let user = await User.create({
        email,
        password,
        phoneNumber,
        address,
        sso,
      });

      res.status(201).json({
        id: user.id,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
        sso: user.sso,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async loginUserBasic(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw {
          name: "ErrorCustom",
          status: 400,
          message: "Credential login is required",
        };
      }

      const user = await User.findOne({
        where: {
          email: email,
        },
      });

      if (!user || !comparePassword(password, user.password)) {
        throw {
          name: "ErrorCustom",
          status: 401,
          message: "Invalid email or password",
        };
      }

      const token = signToken({
        id: user.id,
      });
      res.status(200).json({ access_token: token });
    } catch (error) {
      next(error);
    }
  }
  static async getUserInfo(req, res, next) {
    try {
      const { id } = req.user;
      const user = await User.findByPk(id);
      res.status(200).json({
        id: user.id,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
        sso: user.sso,
      });
    } catch (error) {
      next(error);
    }
  }
};
