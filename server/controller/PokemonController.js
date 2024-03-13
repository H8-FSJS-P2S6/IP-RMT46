const { Op } = require('sequelize');
const { Pokemon } = require('../models');

module.exports = class PokemonController {
    static async huntPokemon(req, res, next) {
        const { name, type, pokedex, attack, defense, weight, height, rarity, imagePokedex, imageBattleFront, imageBattleBack, description } = req.body;
        try {
            const huntPokemon = await Pokemon.create({
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
                UserId: req.user.id
            });
            res.status(201).json(huntPokemon);
        } catch (error) {
            next(error);
        }
    }

    static async shopPokemon(req, res, next) {
        const { name, type, pokedex, attack, defense, weight, height, rarity, imagePokedex, imageBattleFront, imageBattleBack, description } = req.body;
        try {
            const shopPokemon = await Pokemon.create({
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
                UserId: req.user.id
            });
            res.status(201).json(shopPokemon);
        } catch (error) {
            next(error);
        }
    }

    static async battlePokemons(req, res, next) {
        try {
            const pokemons = await Pokemon.findAll({
                where: {
                    UserId: {
                        [Op.eq]: req.params.UserId
                    },
                    include: [
                        {
                            model: User,
                            attributes: ["username", "email", "gender", "age"],
                        }
                    ],
                }
            });
            res.status(200).json(pokemons);
        } catch (error) {
            next(error);
        }
    }

    static async getPokemons(req, res, next) {
        try {
            const pokemons = await Pokemon.findAll({
                include: [
                    {
                        model: User,
                        attributes: ["username", "email", "gender", "age"],
                    }
                ],
            });
            res.status(200).json(pokemons);
        } catch (error) {
            next(error);
        }
    }

    static async getMyPokemons(req, res, next) {
        try {
            const pokemons = await Pokemon.findAll({
                where: {
                    UserId: {
                        [Op.eq]: req.params.UserId
                    },
                    include: [
                        {
                            model: User,
                            attributes: ["username", "email", "gender", "age"],
                        }
                    ],
                }
            });
            res.status(200).json(pokemons);
        } catch (error) {
            next(error);
        }
    }

    static async getPokemonById(req, res, next) {
        try {
            const pokemons = await Pokemon.findByPk(
                req.params.id,
                {
                    include: [
                        {
                            model: User,
                            attributes: ["username", "email", "gender", "age"],
                        }
                    ],
                });
            if (!pokemons) throw { name: "NotFound" }

            res.status(200).json(pokemons);
        } catch (error) {
            next(error);
        }
    }

    static async updatePokemonById(req, res, next) {
        const { name, type, pokedex, attack, defense, weight, height, rarity, imagePokedex, imageBattleFront, imageBattleBack, description } = req.body
        try {
            const pokemon = await Pokemon.findByPk(req.params.id);
            if (!pokemon) throw { name: "NotFound" }

            await pokemon.update({
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
                UserId: req.user.id
            });
            res.status(200).json(pokemon);
        } catch (error) {
            next(error);
        }
    }

    static async deletePokemonById(req, res, next) {
        try {
            const pokemon = await Pokemon.findByPk(req.params.id);
            if (!pokemon) throw { name: "NotFound" }

            await pokemon.destroy();
            res.status(200).json({ message: `${pokemon.name} success to delete` });
        } catch (error) {
            next(error);
        }
    }
}
