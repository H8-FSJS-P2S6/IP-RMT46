const express = require("express");
const PublicController = require("../Controllers/PublicController");
const router = express.Router();

router.get("/products", PublicController.getAllProduct);
router.get("/products/:id", PublicController.getAllProductById);

module.exports = router