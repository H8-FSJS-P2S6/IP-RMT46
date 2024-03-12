const {Meal} = require("../models");
const {apiKey} = require("../helpers/jwt");
const spoonacularEndPoint = "https://api.spoonacular.com";
const axios = require("axios");

module.exports = class MealController {
    static async getMeals(req, res) {
        try {
            const {query} = req.query;
            if(!query) {
                throw {name: "Not found"}
            }
            const url = `${spoonacularEndPoint}/recipes/complexSearch?apiKey=${apiKey}&query=${query}`;
            const response = await axios.get(url)
            console.log(response.data);
            res.status(200).json(response.data.results)
        } catch (error) {
            console.log(error);
            if(error.name === "Not found") {
                return res.status(404).json({message: "Data not found"})
            }
            return res.status(500).json({message: "Internal Server Error"});
        }
    }
}