const express = require('express');
const UserController = require('../controller/UserController');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: `Welcome to Branded Things Server Apps [Arief Rahman Rizaldhi]` })
})

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);

router.get('/home');
router.post('/hunt/');
router.post('/shop/:id');
router.get('/battle/:id');
router.get('/pokedex');
router.get('/pokedex/:id');
router.put('/pokedex/:id');
router.delete('/pokedex/:id');

module.exports = router;