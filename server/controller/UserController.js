const { Op } = require('sequelize');
const { User } = require('../models');
const { signToken } = require('../helpers/jwt');

module.exports = class UserController {
    static async registerUser(req, res, next) {
        try {
            const { username, email, password, gender, age } = req.body;

            let user = await User.create({
                username,
                email,
                password,
                gender,
                age
            });

            res.status(201).json({
                id: user.id,
                username: user.username,
                email: user.email,
                gender: user.gender,
                age: user.age
            });
        } catch (error) {
            next(error);
        }
    }

    static async loginUser(req, res) {
        try {
            const { credential, password } = req.body;

            if (!credential) {
                throw { name: "CustomError", status: 400, message: "email/username is required" }
            }

            if (!password) {
                throw { name: "CustomError", status: 400, message: "Password is required" }
            }

            let user = await User.findOne({
                where: {
                    [Op.or]: [
                        { username: credential },
                        { email: credential }
                    ],
                },
            });

            if (!user || !comparePassword(password, user.password)) {
                throw { name: "CustomError", status: 401, message: "Invalid email/password" }
            }

            const token = signToken({
                id: user.id,
            });

            res.status(200).json({
                access_token: token,
            });
        } catch (error) {
            if (error.name === "CustomError") {
                return res.status(error.status).json({ message: error.message });
            }
            res.status(500).json({ message: "Internal server error" });
        }
    }
}