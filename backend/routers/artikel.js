const express = require('express')
const router = express.Router()
const ArtikelController = require('../controllers/artikel')

router.post("/artikel", ArtikelController.createArtikel);
router.put("/artikel/:id", ArtikelController.updateArtikel);
router.delete("/artikel/:id", ArtikelController.deleteArtikel);

module.exports=router