const express = require("express");
const Controller = require("../controllers/controller");
const authentication = require("../middlewares/authentication");
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
router.use(authentication);
router.post("/add-account", Controller.addAccount);
router.delete("/delete-account/:id", Controller.deleteAccount);

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.patch("/add-images", upload.array("images", 5), Controller.addImages);

router.delete("/delete-image/:id", Controller.deleteImage);

module.exports = router;
