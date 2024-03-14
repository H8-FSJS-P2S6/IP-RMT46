const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");

router.post("/auth/register/basic", UserController.registerBasic);
router.post("/auth/register/google", UserController.registerGoogle);
router.post("/auth/login/basic", UserController.loginBasic);
router.post("/auth/login/google", UserController.loginGoogle);

module.exports = router;
