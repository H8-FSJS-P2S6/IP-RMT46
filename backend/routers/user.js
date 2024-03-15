const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");

router.post("/register", UserController.registerUserBasic);
// router.post("/register/google", UserController.registerGoogle);
router.post("/login", UserController.loginUserBasic);
// router.post("/login/google", UserController.loginGoogle);

module.exports = router;
