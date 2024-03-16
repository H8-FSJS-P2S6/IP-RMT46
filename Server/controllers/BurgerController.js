const { User, Burger, Cart } = require("../models");
const { Op } = require("sequelize");
const burgersHubEndPoint = "https://burgers-hub.p.rapidapi.com";
const axios = require("axios");
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();
const { signToken } = require("../helpers/jwt");
const midtransClient = require('midtrans-client');

module.exports = class BurgerController {
  static async getBurgers(req, res, next) {
    try {
      const { filter, search, sort, page } = req.query;
      let option = {}
      if (filter) {
        option.where = {

          id: filter

        }
      }
      if (search) {
        option.where = {
          name: {
            [Op.iLike]: `%${search}%`
          }
        }
      }
      if (sort) {
        const orderby = sort[0] === "-" ? "desc" : "asc"
        const columnName = orderby === "desc" ? sort.slice(1) : sort
        option.order = [[columnName, orderby]]
      }
      const burgerData = await Burger.findAll(option);
      res.status(200).json(burgerData)
    } catch (error) {
      console.log(error)
      next(error);
    }


    // const options = {
    //   method: 'GET',
    //   url: `${burgersHubEndPoint}/burgers`,
    //   headers: {
    //     'X-RapidAPI-Key': process.env.BURGERS_HUB_API_KEY,
    //     'X-RapidAPI-Host': 'burgers-hub.p.rapidapi.com'
    //   }
    // };

    // try {
    //   const response = await axios.request(options);
    //   console.log(response.data);
    //   res.status(200).json(response.data)
    // } catch (error) {
    //   console.error(error);
    //   return res.status(500).json({ message: "Internal Server Error" });
    // }

  }

  static async getBurgerById(req, res, next) {

    const { burgerId } = req.params;
    try {
      const burgerData = await Burger.findByPk(burgerId);
      if (!burgerData) {
        throw { name: "Not found" }
      }
      res.status(200).json(burgerData)
    } catch (error) {
      console.log(error)
      next(error);
    }


    // const options = {
    //   method: 'GET',
    //   url: `${burgersHubEndPoint}/burgers/${burgerId}`,
    //   headers: {
    //     'X-RapidAPI-Key': process.env.BURGERS_HUB_API_KEY,
    //     'X-RapidAPI-Host': 'burgers-hub.p.rapidapi.com'
    //   }
    // };

    // try {
    //   const response = await axios.request(options);
    //   console.log(response.data);
    //   res.status(200).json(response.data)
    // } catch (error) {
    //   console.error(error);
    //   return res.status(500).json({ message: "Internal Server Error" });
    // }
  }

  static async getBurgerByName(req, res, next) {

    const { name } = req.query;

    const options = {
      method: 'GET',
      url: `${burgersHubEndPoint}/find-burger/`,
      params: {
        searchQuery: "search",
        search: name
      },
      headers: {
        'X-RapidAPI-Key': process.env.BURGERS_HUB_API_KEY,
        'X-RapidAPI-Host': 'burgers-hub.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      res.status(200).json(response.data)
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  static async getMyBurger(req, res, next) {

    try {
      const myBurgerData = await Cart.findAll({ where: { UserId: req.user.id } });
      if(!myBurgerData) {
        throw {name: "Not found"}
      }
      return res.status(200).json(myBurgerData);

    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  static async addBurger(req, res, next) {
    try {
      if(req.user.role !== "Admin") {
        throw {name: "Unauthorized"}
    }
      const { name, desc, price, veg, images } = req.body;
      const burgerData = await Burger.create({ name, desc, price, veg, images });
      return res.status(201).json({ message: "Burger successfully added", burgerData });

    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  static async updateBurgerById(req, res, next) {
    try {
      const { burgerId } = req.params;
      const burgerData = await Burger.findByPk(burgerId);
      if (!burgerData) {
        throw { name: "Not found" }
      }
      const { name, desc, price, veg, images } = req.body;
      await Burger.update({ name, desc, price, veg, images }, { where: { id: req.params.burgerId } });
      return res.status(200).json({ message: "Burger has been updated" });

    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  static async deleteBurgerById(req, res, next) {
    try {
      const { burgerId } = req.params;
      const burgerData = await Burger.findByPk(burgerId);
      if (!burgerData) {
        throw { name: "Not found" }
      }
      await Burger.destroy({ where: { id: req.params.burgerId } });
      return res.status(200).json({ message: "Burger has been deleted" });

    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  static async updateImageById(req, res, next) {
    try {

      if (!req.file) throw { name: "CustomFileError" }

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

      if (!burger) throw { name: "Not found" };

      await burger.update({ images: result.secure_url });

      res.json({ message: "Image successfully updated" })
    } catch (error) {
      next(error);
    }
  }

  static async addToCart(req, res, next) {
    try {
      const { burgerId } = req.params;
      const burgerData = await Burger.findByPk(burgerId);
      if (!burgerData) {
        throw { name: "Not found" }
      }
      const { quantity } = req.body;
      await Cart.create({ quantity, BurgerId: burgerId, UserId: req.user.id });
      return res.status(201).json({ message: "Burger successfully added to cart", burgerData });

    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  static async removeFromCart(req, res, next) {
    try {
      const { burgerId } = req.params;
      const burgerData = await Cart.findOne({where: { BurgerId: burgerId }});
      if (!burgerData) {
        throw { name: "Not found" }
      }
      
      await Cart.destroy({ where: { BurgerId: req.params.burgerId } });
      return res.status(201).json({ message: "Burger successfully removed from cart" });

    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  static async getUser(req, res, next) {

    try {
      const userData = await User.findByPk(req.user.id);
      const { name, email, role, imageUrl, createdAt, updatedAt } = userData;
      return res.status(200).json({ name, email, role, imageUrl, createdAt, updatedAt });

    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  static async updateUserImage(req, res, next) {
    try {

      if (!req.file) throw { name: "CustomFileError" }

      const cloudinary = require("cloudinary").v2;
      cloudinary.config({
        cloud_name: process.env.cloudinary_cloud_name,
        api_key: process.env.cloudinary_api_key,
        api_secret: process.env.cloudinary_api_secret
      });
      const dataURI = `data:${req.file.mimetype};base64,${Buffer.from(req.file.buffer).toString("base64")}`
      const result = await cloudinary.uploader.upload(dataURI, { public_id: "test" })

      const user = await User.findByPk(req.user.id);

      if (!user) throw { name: "Not found" };

      await user.update({ imageUrl: result.secure_url });

      res.json({ message: "Image successfully updated" })
    } catch (error) {
      next(error);
    }
  }

  static async googleLogin(req, res, next) {

    const { googleToken } = req.body;

    console.log(req.body)

    try {
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: "483160331749-3i3b3l3nvvostt3ccublhnmi64dtmkob.apps.googleusercontent.com",  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const { email, name } = ticket.getPayload();
      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          name,
          email,
          password: Math.random().toString()
        }
      });
      console.log({ user, created })
      const token = signToken({ id: user.id })
      res.status(200).json({ message: `Login as ${user.email}`, token });

    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async purchaseBurger(req, res, next) {
    try {
      await Cart.update({ purchased: true, purchasedAt: new Date() }, { where: { UserId: req.user.id } });
      return res.status(200).json({ message: "Burger has been purchased" });

    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  static async generateMidTransToken(req, res, next) {
    try {
      const userData = await User.findByPk(req.user.id);
      const cartData = await Cart.findAll({ where: { UserId: userData.id } });
      console.log(userData, cartData, "<<<<<")
      if (cartData.purchased) {
        throw { name: "CustomPurchaseError" } // error code: 400
      }
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY
      });

      let parameter = {
        transaction_details: {
          order_id: `TRANSACTION_${Math.floor(100000 + Math.random() * 900000)}`,
          gross_amount: req.body.totalPrice
        },
        credit_card: {
          secure: true
        },
        customer_details: {
          name: userData.name,
          email: userData.email
        }
      };

      const midtransToken = await snap.createTransaction(parameter);
      console.log(midtransToken, "<<<<")
      res.status(201).json(midtransToken);


    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}