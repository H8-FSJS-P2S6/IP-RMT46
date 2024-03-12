const {User} = require("../models")
const {comparePassword} = require("../helpers/bcrypt")
const {signToken} = require("../helpers/jwt")

module.exports = class UserController {
    static async registerUser(req, res) {
        try {
            const {name, email, password, role} = req.body;
            await User.create({name, email, password, role});
            res.status(201).json({name, email, role})
        } catch (error) {
            console.log(error)
            if(error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
                return res.status(400).json({message: error.errors[0].message})
            }
            return res.status(500).json({message: "Internal Server Error"})
        }
    }

    static async loginUser(req, res) {
        try {
            const {email, password} = req.body;
            if(!email) {
                throw {name: "CustomEmailError"}
            }
            if(!password) {
                throw {name: "CustomPasswordError"}
            }
            const userData = await User.findOne({where: {email: email}});
            if(!userData || !comparePassword(password, userData.password)) {
                throw {name: "CustomError"}
            }
            const token = signToken({id: userData.id})
            res.status(200).json({access_token: token})
        } catch (error) {
            console.log(error);
            if(error.name === "CustomEmailError") {
                return res.status(400).json({message: "Email is required"})
            }
            if(error.name === "CustomPasswordError") {
                return res.status(400).json({message: "Password is required"})
            }
            if(error.name === "CustomError") {
                return res.status(401).json({message: "Invalid email/password"})
            }
            return res.status(500).json({message: "Internal Server Error"})
        }
    }
}