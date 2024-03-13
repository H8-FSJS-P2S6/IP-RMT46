const { Op } = require('sequelize');
const { User } = require('../models');
const { signToken } = require('../helpers/jwt');
const { comparePassword } = require('../helpers/bcrypt');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();

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

    static async loginUser(req, res, next) {
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
            next(error);
        }
    }

    static async googleLoginUser(req, res, next) {
        const { googleToken } = req.body
        try {
            const ticket = await client.verifyIdToken({
                idToken: googleToken,
                audience: process.env.CLIENT_ID
            });
            const { email, name } = ticket.getPayload();
            const [user, created] = await User.findOrCreate({
                where: { email },
                defaults: {
                    name,
                    email,
                    password: Math.random().toString(),
                },
            });

            res.status(200).json({ message: "Login from google success", payload })
        } catch (error) {
            next(error);
        }
    }
}