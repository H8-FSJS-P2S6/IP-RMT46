const { User, GameAccount, ProfileImage } = require("../models");
const { signToken } = require("../helpers/jwt");
const { comparePassword } = require("../helpers/bcrypt");

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
  static async addAccount(req, res, next) {
    const { playerTag } = req.body;

    try {
      const account = await GameAccount.create({ playerTag: playerTag, playerId: req.user.id });
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
  // static async addImage(req, res, next) {
  //   try {
  //     res.json("Test");
  //   } catch (error) {
  //     console.log(error.message);
  //     next(error);
  //   }
  // }
  static async addImages(req, res, next) {
    try {
      const cloudinary = require("cloudinary").v2;

      cloudinary.config({
        cloud_name: "dkuq6sef1",
        api_key: "624519455673126",
        api_secret: "G3nfuOCqH-8AO3qqqrM5d3c6-dI",
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

  static async deleteImage(req, res, next) {
    const { id } = req.params;
    try {
      const account = await ProfileImage.findByPk(id);
      account.destroy();
      res.json("Test");
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  // static async register(req, res, next) {
  //   try {
  //     res.json("Test");
  //   } catch (error) {
  //     console.log(error.message);
  //     next(error);
  //   }
  // }
}

module.exports = Controller;
