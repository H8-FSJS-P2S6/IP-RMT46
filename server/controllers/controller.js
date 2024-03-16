const { User, GameAccount, ProfileImage } = require("../models");
const { signToken } = require("../helpers/jwt");
const { comparePassword, hashPassword } = require("../helpers/bcrypt");
const axios = require("axios");

class Controller {
  static async login(req, res, next) {
    const { email, password } = req.body;
    try {
      if (!email) {
        throw { name: "ValidationError", message: "Email is required" };
      }
      if (!password) {
        throw { name: "ValidationError", message: "Password is required" };
      }
      const user = await User.findOne({
        where: { email },
      });
      if (!user) {
        throw { name: "Unauthorized", message: "Invalid email/password" };
      }

      const passwordMatch = comparePassword(password, user.password);
      if (!passwordMatch) {
        throw { name: "Unauthenticated", message: "Invalid email or password" };
      }

      const access_token = signToken({ id: user.id });
      res.status(200).json({ access_token: access_token });
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }
  static async register(req, res, next) {
    const { email, password } = req.body;

    try {
      if (!email) {
        throw { name: "ValidationError", message: "Email is required" };
      }
      if (!password) {
        throw { name: "ValidationError", message: "Password is required" };
      }
      const existingUser = await User.findOne({ where: { email: email } });
      if (existingUser) {
        throw { name: "ValidationError", message: "Email is already registered" };
      }

      const user = await User.create(req.body);
      res.status(201).json({
        id: user.id,
        email: user.email,
      });
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  static async findPlayerByTag(req, res, next) {
    const { tag } = req.params;
    let accountTag = "";
    // console.log(tag, "......");
    try {
      if (tag[0] === "#") {
        const [theTag, str] = tag.split("#");
        // console.log({ theTag, str });
        accountTag = str;
      } else {
        accountTag = tag;
      }

      const { data } = await axios.get(`https://api.clashofclans.com/v1/players/%23${accountTag}`, {
        headers: {
          Authorization: `Bearer ${process.env.CLASH_OF_CLANS_API}`,
        },
      });
      res.json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async findClanByTag(req, res, next) {
    const { tag } = req.params;
    let clanTag = "";
    try {
      if (tag[0] === "#") {
        const [theTag, str] = tag.split("#");
        console.log({ theTag, str });
        clanTag = str;
      } else {
        clanTag = tag;
      }

      const { data } = await axios.get(`https://api.clashofclans.com/v1/clans/%23${clanTag}`, {
        headers: {
          Authorization: `Bearer ${process.env.CLASH_OF_CLANS_API}`,
        },
      });
      res.json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async playerRankings(req, res, next) {
    // const { locationId } = req.params;
    const { country } = req.params;

    const { items } = require("../data/locationId.json");
    let location = "";

    if (country != "global") {
      items.forEach((element) => {
        if (element.name === country) {
          location = element.id;
        }
      });
    } else {
      location = "global";
    }
    // console.log(location);
    // res.json(location);
    const { limit, after, before } = req.query;
    let locationId = location;

    try {
      let queryParams = `limit=${limit || 10}`;
      if (after) queryParams += `&after=${after}`;
      if (before) queryParams += `&before=${before}`;

      const { data } = await axios.get(`https://api.clashofclans.com/v1/locations/${locationId}/rankings/players?${queryParams}`, {
        headers: {
          Authorization: `Bearer ${process.env.CLASH_OF_CLANS_API}`,
        },
      });

      res.json(data);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  static async verifyToken(req, res, next) {
    const { playerTag } = req.params;
    const { token } = req.body;
    let accountTag = "";
    try {
      if (playerTag[0] === "#") {
        const [theTag, str] = playerTag.split("#");
        console.log({ theTag, str });
        accountTag = str;
      } else {
        accountTag = playerTag;
      }

      const url = `https://api.clashofclans.com/v1/players/%23${accountTag}/verifytoken`;

      const data = {
        token: token,
      };

      const bearerToken = process.env.CLASH_OF_CLANS_API;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearerToken}`,
        },
      };

      // const response = await axios.post(url, data, config);
      const response = await axios.post(url, data, config);
      console.log("Response:", response.data);
      res.json(response.data);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  static async addAccount(req, res, next) {
    const { playerTag } = req.body;

    try {
      const account = await GameAccount.create({ playerTag: playerTag, playerId: req.user.id });
      res.json(account);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  static async getAccount(req, res, next) {
    try {
      const accounts = await GameAccount.findAll({ where: { playerId: req.user.id } });
      res.json(accounts);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  static async getCountry(req, res, next) {
    try {
      const { items } = require("../data/locationId.json");

      const countries = items.filter((item) => item.isCountry);

      res.json(countries);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  static async deleteAccount(req, res, next) {
    const { id } = req.params;
    try {
      const account = await GameAccount.findByPk(id);
      account.destroy();
      res.json("Test");
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  static async addImages(req, res, next) {
    console.log("tester");
    try {
      const cloudinary = require("cloudinary").v2;

      cloudinary.config({
        cloud_name: process.env.CLOUND_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
      });

      const uploadPromises = req.files.map(async (file) => {
        const mimeType = file.mimetype;
        const data = Buffer.from(file.buffer).toString("base64");
        const dataURI = `data:${mimeType};base64,${data}`;
        return cloudinary.uploader.upload(dataURI, {
          overwrite: false,
          unique_filename: true,
        });
      });

      const results = await Promise.all(uploadPromises);

      const images = results.map((element) => {
        return { imgUrl: element.url };
      });

      await ProfileImage.bulkCreate(images);
      res.json(images);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  static async getImage(req, res, next) {
    try {
      const images = await ProfileImage.findAll();
      res.json(images);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  static async deleteImage(req, res, next) {
    const { id } = req.params;
    // const { id } = req.body;
    try {
      const image = await ProfileImage.findByPk(id);
      image.destroy();
      res.json(image);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  static async changePassword(req, res, next) {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    const id = req.user.id;
    try {
      const user = await User.findByPk(id);

      if (confirmNewPassword != newPassword) {
        throw { name: "Unauthenticated", message: "Password not match" };
      }

      const passwordMatch = comparePassword(currentPassword, user.password);
      if (!passwordMatch) {
        throw { name: "Unauthenticated", message: "Invalid current password" };
      }

      const account = await user.update({ password: hashPassword(newPassword) });

      res.json({ email: account.email });
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }
}

module.exports = Controller;
