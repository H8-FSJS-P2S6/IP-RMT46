const express = require('express')
const router = express.Router()
const ArtikelController = require('../controllers/artikel')
// const WeatherController = require('../controllers/weather')
const CategoryController = require('../controllers/category')

router.get("/artikel", ArtikelController.listArtikel);
router.get("/artikel/:id", ArtikelController.getArtikel);
router.get("/categories", CategoryController.listCategory);
router.get("/categories/:id", CategoryController.getCategory);
// router.get("/weathers/:city", WeatherController.getWeather);

module.exports=router