const { Burger } = require("../models");

async function authorization(req, res, next) {
    try {
        const {burgerId} = req.params;
            const burgerData = await Burger.findByPk(burgerId);
            if(!burgerData) {
                throw {name: "Not found"}
            }
            if(req.user.role !== "Admin") {
                throw {name: "Unauthorized"}
            }

    next();

    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = authorization;