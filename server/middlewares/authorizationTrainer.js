const { Pokemon } = require('../models');

async function authorizationTrainer(req, res, next) {
    try {
        if (req.user.role === "Admin") {
            next();
        } else {
            let pokemon = await Pokemon.findByPk(req.params.id);

            if (!pokemon) {
                throw { name: "notFound" }
            }
            if (pokemon.UserId !== req.user.id) {
                throw { name: "Unauthorized" }
            }

            next();
        }
    } catch (error) {
        next(error);
    }
}

module.exports = authorizationTrainer;