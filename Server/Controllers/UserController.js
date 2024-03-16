const { User } = require("../models");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const {OAuth2Client} = require("google-auth-library")
const client = new OAuth2Client();

class UserController{
    static async addUser(req, res, next) {
        try {
          const { email, password } = req.body;
          let user = await User.create({
            email,
            password,
          });
          res.status(201).json({ id: user.id, email: user.email });
        } catch (error) {
          next(error)
        }
      }

    static async loginUser(req, res, next) {
        try {
          let { email, password } = req.body;
          if (!email) {
            throw {
              name: "CustomError",
              status: 400,
              message: "Email is required",
            };
          }
    
          if (!password) {
            throw {
              name: "CustomError",
              status: 400,
              message: "Password is required",
            };
          }
    
          let user = await User.findOne({
            where: {
              email: email,
            },
          });
          if (!user || !comparePassword(password, user.password)) {
            throw {
              name: "CustomError",
              status: 400,
              message: "Invalid email/password",
            };
          }
    
          let token = signToken({ id: user.id });
          res.status(200).json({ access_token: token , userId: user.id});
        } catch (error) {
            next(error)
        }
      }

      static async googleLogin(req, res, next) {
        const { googleToken } = req.body;
        console.log(req.body, "<<< req.body googleLogin");
        try {
          const ticket = await client.verifyIdToken({
            idToken: googleToken,
            audience:
              "888996035254-qqqrffv50i0tk2i45ja7j75g1ii9nlkg.apps.googleusercontent.com",
          });
          const { email, name } = ticket.getPayload();
          const password = Math.random().toString();
          const [user, created] = await User.findOrCreate({
            where: { email },
            defaults: {
              name,
              email,
              password,
            },
            
          });
          console.log({ user, created }, "<<< user created googleLogin");
    
          const access_token = signToken({ id: user.id });
          res
            .status(200)
            .json({ message: "Logged in as " + user.email, access_token });
        } catch (err) {
          next(err);
        }
      }
}

module.exports = UserController