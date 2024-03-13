const express = require("express");
const HomeController = require("../controllers/HomeController");
const UserController = require("../controllers/UserController");
const authentication = require("../middlewares/authentication");
const MessageController = require("../controllers/MessageController");
const ProfileController = require("../controllers/ProfileController");
const router = express.Router();

router.post("/register", UserController.Register);
router.post("/login", UserController.Login);

router.use(authentication);
router.get("/", HomeController.Home);
router.get("/profile", ProfileController.getAllProfiles);
router.post("/profile", ProfileController.createProfile);
router.get("/:username/message", MessageController.getDirectMessages);
router.post("/:username/message", MessageController.sendDirectMessage);

module.exports = router;
