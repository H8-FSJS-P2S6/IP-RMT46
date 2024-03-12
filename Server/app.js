if(process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require("express");
const app = express();
const port = 3000;

const UserController = require("./controllers/UserController");
const MealController = require("./controllers/MealController");

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", (req, res) => {
    res.json({message: "Welcome to the TastyBites API"})
})

app.post("/register", UserController.registerUser);
app.post("/login", UserController.loginUser);

app.get("/meals", MealController.getMeals);

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})