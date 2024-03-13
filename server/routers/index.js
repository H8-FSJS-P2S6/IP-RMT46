const express = require('express');
const UserController = require('../controller/UserController');
const errorHandler = require('../middlewares/errorHandler');
const authentication = require('../middlewares/authentication');
const authorizationTrainer = require('../middlewares/authorizationTrainer');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: `Welcome to Pokemon World Desu [Arief Rahman Rizaldhi]` })
})

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);

router.use(authentication);

router.post('/hunt/');
router.post('/shop/:id',authorizationTrainer);
router.get('/battle/:id',authorizationTrainer);
router.get('/pokedex');
router.get('/pokedex/:id',authorizationTrainer);
router.put('/pokedex/:id',authorizationTrainer);
router.delete('/pokedex/:id',authorizationTrainer);

router.use(errorHandler);

module.exports = router;