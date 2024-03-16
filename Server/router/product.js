const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");
const ProductController = require("../Controllers/ProductController");



router.use(authentication)


router.get("/", ProductController.getAllProduct);
router.get("/:id", ProductController.getProductById);



module.exports = router