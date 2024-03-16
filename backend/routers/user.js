const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const authentication = require("../middlewares/authentication");


router.post("/register", UserController.registerUserBasic);
// router.post("/register/google", UserController.registerGoogle);
router.post("/login", UserController.loginUserBasic);
// router.post("/login/google", UserController.loginGoogle);
router.get("/userinfo", authentication, UserController.getUserInfo);
router.get("/user/:id", authentication, UserController.getUser);

module.exports = router;
