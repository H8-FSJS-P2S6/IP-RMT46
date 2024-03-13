const express = require("express");
const Controller = require("../controllers/controller");
const router = express.Router();

const timeLog = (req, res, next) => {
  console.log("Time: ", Date.now());
  next();
};
router.use(timeLog);

router.get("/", (req, res) => {
  res.send("Hello World");
});
router.get("/register", (req, res) => {
  res.send("Hello World");
});

router.post("/login", Controller.login);

module.exports = router;
