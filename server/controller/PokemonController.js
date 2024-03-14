const { Pokemon, User } = require('../models');
const axios = require('axios');

module.exports = class PokemonController {
    static async huntPokemon(req, res, next) {
        const { type } = req.query;

        const types = ['water', 'bug', 'dark', 'dragon', 'electric', 'fairy', 'fighting', 'fire', 'flying', 'ghost', 'grass', 'ground', 'ice', 'normal', 'poison', 'psychic', 'rock', 'steel'];

        if (!types.includes(type)) {
            throw { name: "NotFound", status: 400, message: 'Invalid type pokemon.' };
        }

        try {

            const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
            const { pokemon } = response.data;
            const randomPokemon = pokemon[Math.floor(Math.random() * pokemon.length)].pokemon.url;

            const pokemonResponse = await axios.get(randomPokemon);
            const { name, id, types, stats, weight, height, sprites, base_experience } = pokemonResponse.data;

            const pokemonData = {
                name,
                type: types.map((type) => type.type.name)[0],
                pokedex: id,
                attack: stats.find((stat) => stat.stat.name === 'attack').base_stat,
                hp: stats.find((stat) => stat.stat.name === 'hp').base_stat,
                weight,
                height,
                captureRate: base_experience,
                imagePokedex: sprites.other["official-artwork"].front_default,
                imageBattleFront: sprites.other.showdown.front_default,
                imageBattleBack: sprites.other.showdown.back_default,
                UserId: req.user.id
            };


            if (pokemonData) {
                const isCaptured = (probability) => {
                    const randomValue = Math.random() * 100;
                    return (randomValue <= probability);
                };

                const captureProbability = (1 + pokemonData.hp * pokemonData.hp * 7 * 1) / (pokemonData.captureRate * 3) / 256 * 100;

                if (!pokemonData.captureRate || !pokemonData.imageBattleBack || !pokemonData.name) {
                    throw { name: "CustomError", status: 400, message: "Pokemon escaped. Find again!" };
                }

                const captured = isCaptured(captureProbability);

                if (captured) {
                    const capturedPokemon = await Pokemon.create(pokemonData);
                    res.status(201).json(capturedPokemon);
                } else {
                    res.status(200).json({ message: "Pokemon escaped. Find again!" });
                    // throw { name: "CustomError", status: 400, message: "Pokemon escaped. Find again!" };
                }
            }

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

            const user = await User.findByPk(+req.user.id);
            if (!user) {
                throw { name: "NotFound" };
            }

            const coinsForGacha = quantity === '1' ? 10 : 100;
            if (user.coins < coinsForGacha) {
                throw { name: "CustomError", status: 400, message: `Sorry ${user.username}, you need more coins.` };
            }

            const pokemons = [];

            for (let x = 0; x < parseInt(quantity); x++) {

                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 900) + 1}`);
                const { name, types, id, stats, weight, height, sprites, base_experience } = response.data;

                const pokemonData = {
                    name,
                    type: types.map((type) => type.type.name)[0],
                    pokedex: id,
                    attack: stats.find((stat) => stat.stat.name === 'attack').base_stat,
                    hp: stats.find((stat) => stat.stat.name === 'hp').base_stat,
                    weight,
                    height,
                    captureRate: base_experience,
                    imagePokedex: sprites.other["official-artwork"].front_default,
                    imageBattleFront: sprites.other.showdown.front_default,
                    imageBattleBack: sprites.other.showdown.back_default,
                    UserId: req.user.id
                };

                const gachaPokemon = await Pokemon.create(pokemonData);
                pokemons.push(gachaPokemon);
            }

            await user.decrement({ coins: +coinsForGacha });

            res.status(201).json(pokemons);
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