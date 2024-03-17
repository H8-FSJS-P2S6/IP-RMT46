if(process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require("express");
const app = express();
const port = 3000;

const UserController = require("./controllers/UserController");
const BurgerController = require("./controllers/BurgerController");
const authentication = require("./middlewares/authentication");
const authorization = require("./middlewares/authorization");
const errorHandler = require("./middlewares/errorHandler");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const cors = require("cors");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json({message: "Welcome to the Burger Bites API"})
})

app.post("/register", UserController.registerUser);
app.post("/login", UserController.loginUser);

app.get("/burgers", BurgerController.getBurgers);

app.post("/google-login", BurgerController.googleLogin);

// app.use(authentication);

app.get("/users", authentication, BurgerController.getUser); 
app.patch("/users/profile", authentication, upload.single("image"), BurgerController.updateUserImage); 
app.get("/cart", authentication, BurgerController.getMyBurger);
app.patch("/cart/purchase", authentication, BurgerController.purchaseBurger); 
app.post("/cart/generateMidTransToken", authentication, BurgerController.generateMidTransToken); 
app.post("/burgers", authentication, BurgerController.addBurger); 
app.get("/burgers/:burgerId", BurgerController.getBurgerById);
app.put("/burgers/:burgerId", authentication, authorization, BurgerController.updateBurgerById);
app.delete("/burgers/:burgerId", authentication, authorization, BurgerController.deleteBurgerById);
app.patch("/burgers/:burgerId/image", authentication, authorization, upload.single("image"), BurgerController.updateImageById);
app.post("/cart/:burgerId", authentication, BurgerController.addToCart); 
app.delete("/cart/:burgerId", authentication, BurgerController.removeFromCart); 

app.use(errorHandler);

module.exports = app;