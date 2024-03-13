const express = require("express");
const Controller = require("../controllers/controller");
const router = express.Router();

const timeLog = (req, res, next) => {
  console.log("Time: ", Date.now());
  next();
};
router.use(timeLog);

router.get("/", (req, res) => {
  // res.send("Hello World");
  res.json([{ message: "hello world" }]);
});
router.post("/login", Controller.login);

router.post("/register", Controller.register);

module.exports = router;
