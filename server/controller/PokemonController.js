const { Pokemon, User } = require('../models');
const axios = require('axios');

module.exports = class PokemonController {
    static async huntPokemon(req, res, next) {
        const { type } = req.query;

        if (type !== 'water' &&
            type !== 'bug' &&
            type !== 'dark' &&
            type !== 'dragon' &&
            type !== 'electric' &&
            type !== 'fairy' &&
            type !== 'fighting' &&
            type !== 'fire' &&
            type !== 'flying' &&
            type !== 'ghost' &&
            type !== 'grass' &&
            type !== 'ground' &&
            type !== 'ice' &&
            type !== 'normal' &&
            type !== 'poison' &&
            type !== 'psychic' &&
            type !== 'rock' &&
            type !== 'steel') {
            throw { name: "CustomError", status: 400, message: 'Invalid type pokemon.' };
        }

        try {

            const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
            const { pokemon } = response.data;
            const randomPokemon = pokemon[Math.floor(Math.random() * pokemon.length)].pokemon.url;

            const pokemonResponse = await axios.get(randomPokemon);
            const { name, id, types, stats, weight, height, sprites } = pokemonResponse.data;

            const pokemonData = {
                name,
                type: types.map((type) => type.type.name)[0],
                pokedex: id,
                attack: stats.find((stat) => stat.stat.name === 'attack').base_stat,
                hp: stats.find((stat) => stat.stat.name === 'hp').base_stat,
                weight,
                height,
                imagePokedex: sprites.other["official-artwork"].front_default,
                imageBattleFront: sprites.other.showdown.front_default,
                imageBattleBack: sprites.other.showdown.back_default,
                UserId: req.user.id
            };

            const huntPokemon = await Pokemon.create(pokemonData);

            res.status(201).json(huntPokemon);
        } catch (error) {
            next(error);
        }
    }

    static async shopPokemon(req, res, next) {
        const { quantity } = req.query;

        if (quantity !== '1' && quantity !== '10') {
            throw { name: "CustomError", status: 400, message: 'Invalid quantity. Quantity must be either 1 or 10.' };
        }

        try {
            const pokemons = [];

            for (let x = 0; x < parseInt(quantity); x++) {

                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 900) + 1}`);
                const { name, types, id, stats, weight, height, sprites } = response.data;

                console.log(types.map((type) => type.type.name)[0])
                const pokemonData = {
                    name,
                    type: types.map((type) => type.type.name)[0],
                    pokedex: id,
                    attack: stats.find((stat) => stat.stat.name === 'attack').base_stat,
                    hp: stats.find((stat) => stat.stat.name === 'hp').base_stat,
                    weight,
                    height,
                    imagePokedex: sprites.other["official-artwork"].front_default,
                    imageBattleFront: sprites.other.showdown.front_default,
                    imageBattleBack: sprites.other.showdown.back_default,
                    UserId: req.user.id
                };

                const gachaPokemon = await Pokemon.create(pokemonData);
                pokemons.push(gachaPokemon);
            }

            res.status(201).json(pokemons);
        } catch (error) {
            next(error);
        }
    }

    static async battlePokemons(req, res, next) {
        try {
            const pokemons = await Pokemon.findAll({
                where: {
                    UserId: req.params.UserId
                },
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

    static async getPokemonById(req, res, next) {
        try {
            const pokemon = await Pokemon.findByPk(+req.params.id, {
                include: [
                    {
                        model: User,
                        attributes: ["username", "email", "gender", "age"],
                    }
                ],
            });
            if (!pokemon) {
                throw { name: "NotFound" };
            }
            res.status(200).json(pokemon);
        } catch (error) {
            next(error);
        }
    }

    static async updatePokemonById(req, res, next) {
        const { name, imagePokedex, } = req.body
        try {
            const pokemon = await Pokemon.findByPk(+req.params.id);
            if (!pokemon) {
                throw { name: "NotFound" };
            }

            await pokemon.update({
                name,
                imagePokedex,
                UserId: req.user.id
            });
            res.status(200).json(pokemon);
        } catch (error) {
            next(error);
        }
    }

    static async deletePokemonById(req, res, next) {
        try {
            const pokemon = await Pokemon.findByPk(+req.params.id);
            if (!pokemon) {
                throw { name: "NotFound" };
            }

            await pokemon.destroy();
            res.status(200).json({ message: `${pokemon.name} successfully deleted` });
        } catch (error) {
            next(error);
        }
    }
}