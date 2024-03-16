const express = require ("express");
const UserController = require("../Controllers/UserController");
const router = express.Router();

router.post("/register", UserController.addUser)
router.post("/login", UserController.loginUser)
router.post("/google-login", UserController.googleLogin)

router.get("/", (req, res) => {
    res.send("Hello World!");
  });
  
router.use("/public",require("./public"));

router.use("/products",require("./product"));

router.use("/cart",require("./cart"));

router.use("/proof",require("./proof"));















module.exports = router