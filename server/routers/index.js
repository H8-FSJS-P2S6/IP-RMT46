const express = require("express");
const Controller = require("../controllers/controller");
const authentication = require("../middlewares/authentication");
const router = express.Router();

router.get("/", (req, res) => {
  res.json([{ message: "hello world" }]);
});
router.post("/login", Controller.login);
router.post("/register", Controller.register);
router.get("/find-player", Controller.findPlayerByTag);
router.get("/find-clan", Controller.findClanByTag);
router.get("/player-rankings", Controller.playerRankings);
router.post("/players/:playerTag/verifytoken", Controller.verifyToken);
router.use(authentication);
router.post("/add-account", Controller.addAccount);
router.delete("/delete-account/:id", Controller.deleteAccount);

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
router.patch("/add-images", upload.array("images", 5), Controller.addImages); //admin

router.delete("/delete-image/:id", Controller.deleteImage); //admin
router.put("/change-password/:id", Controller.changePassword);

module.exports = router;
