const express = require("express");
const router = express.Router();


const authentication = require("../middlewares/authentication");

const ProofController = require("../Controllers/ProofController");

router.use(authentication)

router.post("/", ProofController.createProof);

module.exports = router
