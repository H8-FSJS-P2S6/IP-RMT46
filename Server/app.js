if(process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require("express");
const app = express();
const port = 3000;

const UserController = require("./controllers/UserController");
const BurgerController = require("./controllers/BurgerController");

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", (req, res) => {
    res.json({message: "Welcome to the Burger Bites API"})
})

app.post("/register", UserController.registerUser);
app.post("/login", UserController.loginUser);

app.get("/burgers", BurgerController.getBurgers);
app.get("/burgers/:burgerId", BurgerController.getBurgerById);
app.post("/burgers/add", BurgerController.addBurger);
app.put("/burgers/:burgerId", BurgerController.updateBurgerById);
app.delete("/burgers/:burgerId", BurgerController.deleteBurgerById);
app.patch("/burgers/:burgerId/image", BurgerController.updateImageById);
app.get("/burgers/mycart", BurgerController.getMyBurger);
app.post("/burgers/:burgerId/mycart", BurgerController.addToCart);

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})