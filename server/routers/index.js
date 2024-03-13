const express = require('express');
const UserController = require('../controller/UserController');
const errorHandler = require('../middlewares/errorHandler');
const authentication = require('../middlewares/authentication');
const authorizationTrainer = require('../middlewares/authorizationTrainer');
const PokemonController = require('../controller/PokemonController');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: `Welcome to Pokemon World Desu [Arief Rahman Rizaldhi]` })
})

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);

router.use(authentication);

router.post('/hunt', PokemonController.huntPokemon);
router.post('/shop', PokemonController.shopPokemon);
router.get('/battle/:UserId', authorizationTrainer, PokemonController.battlePokemons);
router.get('/pokedex', PokemonController.getPokemons);
router.get('/pokedex/:UserId', authorizationTrainer, PokemonController.getMyPokemons);
router.get('/pokedex/:id', authorizationTrainer, PokemonController.getPokemonById);
router.put('/pokedex/:id', authorizationTrainer, PokemonController.updatePokemonById);
router.delete('/pokedex/:id', authorizationTrainer, PokemonController.deletePokemonById);

router.use(errorHandler);

module.exports = router;