const { User } = require("../models")
const { comparePassword } = require("../helpers/bcrypt")
const { signToken } = require("../helpers/jwt")

module.exports = class UserController {
    static async registerUser(req, res, next) {
        try {
            const { name, email, password, role } = req.body;
            await User.create({ name, email, password, role });
            res.status(201).json({ name, email, role })
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async loginUser(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email) {
                throw { name: "CustomEmailError" }
            }
            if (!password) {
                throw { name: "CustomPasswordError" }
            }
            const userData = await User.findOne({ where: { email: email } });
            if (!userData || !comparePassword(password, userData.password)) {
                throw { name: "CustomError" }
            }
            const token = signToken({ id: userData.id })
            res.status(200).json({ access_token: token })
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}