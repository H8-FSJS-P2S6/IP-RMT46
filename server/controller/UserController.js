const { Op } = require('sequelize');
const { User } = require('../models');
const { signToken } = require('../helpers/jwt');
const { comparePassword } = require('../helpers/bcrypt');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();
const midtransClient = require('midtrans-client')

let snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
});

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
            console.log(ticket.getPayload())
            const [user, created] = await User.findOrCreate({
                where: { email },
                defaults: {
                    name,
                    email,
                    password: Math.random().toString(),
                    username: `${name} ${email.split("@")[0]} ${Math.floor(Math.random() * 1e6)}`,
                    gender: null,
                    age: null
                },
            });

            const access_token = signToken({ id: user.id })
            res.status(201).json({ message: `Logged in as ${user.email}`, access_token })
        } catch (error) {
            next(error);
        }
    }

    static async generateMidtransToken(req, res, next) {
        const { coinsToPurchase } = req.body;

        try {
            const findUser = await User.findByPk(+req.user.id)
            if (!findUser) throw { name: "NotFound" }
            let price = coinsToPurchase * 10000;

            let parameter = {
                "transaction_details": {
                    "order_id": "TRANSACTION_" + Math.floor(1000000 + Math.random() * 9000000),
                    "gross_amount": parseInt(price),
                    "currency": 'IDR'
                },
                "credit_card": {
                    "secure": true
                },
                "customer_details": {
                    "username": findUser.username,
                    "email": findUser.email,
                }
            };

            const midtransToken = await snap.createTransaction(parameter)

            res.status(201).json(midtransToken)
        } catch (error) {
            next(error);
        }
    }

    static async topUpCoins(req, res, next) {
        const { coinsToPurchase } = req.body;

        try {
            const findUser = await User.findByPk(+req.user.id)
            if (!findUser) throw { name: "NotFound" }
           
            await findUser.increment({ coins: +coinsToPurchase });

            res.status(200).json({message:`Successfully payment. You add ${coinsToPurchase} coins`})
        } catch (error) {
            next(error);
        }
    }
}