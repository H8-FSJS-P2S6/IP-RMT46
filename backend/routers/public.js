const express = require('express')
const router = express.Router()
const ArtikelController = require('../controllers/artikel')
const WeatherController = require('../controllers/weather')
const CategoryController = require('../controllers/category')

router.get("/artikel/:id", ArtikelController.getArtikel);
router.get("/artikel", ArtikelController.listArtikel);
router.get("/category/:id", CategoryController.getCategoty);
router.get("/category", CategoryController.listCategoty);
router.get("/weather/:city", WeatherController.getWeather);

module.exports=router