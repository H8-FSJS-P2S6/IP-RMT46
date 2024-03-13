const { Burger } = require("../models");
const { apiKey } = require("../helpers/apiKey");
const burgersHubEndPoint = "https://burgers-hub.p.rapidapi.com";
const axios = require("axios");

module.exports = class BurgerController {
  static async getBurgers(req, res) {

    const options = {
      method: 'GET',
      url: `${burgersHubEndPoint}/burgers`,
      headers: {
        'X-RapidAPI-Key': `${apiKey}`,
        'X-RapidAPI-Host': 'burgers-hub.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      res.status(200).json(response.data)
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getBurgerById(req, res) {

    const {burgerId} = req.params;

    const options = {
      method: 'GET',
      url: `${burgersHubEndPoint}/burgers/${burgerId}`,
      headers: {
        'X-RapidAPI-Key': `${apiKey}`,
        'X-RapidAPI-Host': 'burgers-hub.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      res.status(200).json(response.data)
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getBurgerByName(req, res) {

    const {name} = req.query;

    const options = {
      method: 'GET',
      url: `${burgersHubEndPoint}/find-burger/`,
      params: {
        searchQuery: "search",
        search: name
      },
      headers: {
        'X-RapidAPI-Key': `${apiKey}`,
        'X-RapidAPI-Host': 'burgers-hub.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      res.status(200).json(response.data)
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getMyBurger(req, res) {

    try {
      const myBurgerData = await Cart.findAll({where: {UserId: req.user.id}});
      return res.status(200).json(myBurgerData);
      
  } catch (error) {
      console.log(error);
      next(error)
  }
  }

  static async addBurger(req, res, next) {
    try {
        const {name, desc, price, veg, images} = req.body;
        const burgerData = await Grocery.create({name, desc, price, veg, images});
        return res.status(201).json({message: "Burger successfully added", burgerData});
        
    } catch (error) {
        console.log(error);
        next(error)
    }
}

static async updateBurgerById(req, res, next) {
  try {
    const {burgerId} = req.params;
            const burgerData = await Burger.findByPk(burgerId);
            if(!burgerData) {
                throw {name: "Not found"}
            }
      const {name, desc, price, veg, images} = req.body;
      await Grocery.update({name, desc, price, veg, images}, {where: {id: req.params.id}});
      return res.status(200).json({message: "Burger has been updated"});
      
  } catch (error) {
      console.log(error);
      next(error)
  }
}

static async deleteBurgerById(req, res, next) {
  try {
    const {burgerId} = req.params;
            const burgerData = await Burger.findByPk(burgerId);
            if(!burgerData) {
                throw {name: "Not found"}
            }
      await Burger.destroy({where: {id: req.params.id}});
      return res.status(200).json({message: "Burger has been deleted"});
      
  } catch (error) {
      console.log(error);
      next(error)
  }
}

static async updateImageById(req, res, next) {
  try {

      if(!req.file) throw { name: "CustomFileError" }

      const cloudinary = require("cloudinary").v2;
      cloudinary.config({
          cloud_name: process.env.cloudinary_cloud_name,
          api_key: process.env.cloudinary_api_key,
          api_secret: process.env.cloudinary_api_secret
      });
      const dataURI = `data:${req.file.mimetype};base64,${Buffer.from(req.file.buffer).toString("base64")}`
      const result = await cloudinary.uploader.upload(dataURI, { public_id: "test" })

      const { burgerId } = req.params;
      const burger = await Burger.findByPk(burgerId);

      if (!burger) throw { name: "CustomBurgerError" };

      await burger.update({ image: result.secure_url });

      res.json({ message: "Image successfully updated" })
  } catch (error) {
      next(error);
  }
}

static async addToCart(req, res, next) {
  try {
    const {burgerId} = req.params;
            const burgerData = await Burger.findByPk(burgerId);
            if(!burgerData) {
                throw {name: "Not found"}
            }
      const {quantity} = req.body;
      await Cart.create({quantity, BurgerId: burgerId, UserId: req.user.id});
      return res.status(201).json({message: "Burger successfully added to cart", burgerData});
      
  } catch (error) {
      console.log(error);
      next(error)
  }
}
}