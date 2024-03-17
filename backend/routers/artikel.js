const express = require('express')
const router = express.Router()
const ArtikelController = require('../controllers/artikel')

router.post("/", ArtikelController.createArtikel);
router.put("/:id", ArtikelController.updateArtikel);
router.delete("/:id", ArtikelController.deleteArtikel);

module.exports=router