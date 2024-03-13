const { Pokemon } = require('../models');

module.exports = class PokemonController {
    static async huntPokemon(req, res, next) {
        const { name, type, pokedex, attack, defense, weight, height, rarity, imagePokedex, imageBattleFront, imageBattleBack, description } = req.body;
        try {
            const addPokemon = await Pokemon.create({
                name,
                type,
                pokedex,
                attack,
                defense,
                weight,
                height,
                rarity,
                imagePokedex,
                imageBattleFront,
                imageBattleBack,
                description,
                authorId: req.user.id
            });
            res.status(201).json(addPokemon);
        } catch (error) {
            next(error);
        }
    }
}
