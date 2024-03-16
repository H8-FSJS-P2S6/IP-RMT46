const { Artikel } = require("../models");

module.exports = class ArtikelController {
  static async createArtikel(req, res, next) {
    try {
      const { title, description, UserId, imgUrl, CategoryId  } = req.body;
      if (!title || !description || !UserId || !imgUrl || !CategoryId) {
        throw {
          name: "ErrorCustom",
          status: 400,
          message: "title/description/UserId/imgUrl/CategoryId cannot be empty!",
        };
      }
      const existingArtikel = await Artikel.findOne({
        where: { title: title },
      });
      if (existingArtikel) {
        throw {
          name: "ErrorCustom",
          status: 409,
          message: "Artikel title already exists!",
        };
      }

      const createArtikel = await Artikel.create({ title, description, UserId, imgUrl, CategoryId });
      res.status(201).json(createArtikel);
    } catch (error) {
      next(error);
    }
  }

  static async getArtikel(req, res, next) {
    try {
      const { id } = req.params;
      const artikel = await Artikel.findByPk(id);
      res.status(200).json(artikel);
    } catch (error) {
      next(error);
    }
  }

  static async listArtikel(req, res, next) {
    try {
      let artikel;
      const { category } = req.query;
      if (category) {
        artikel = await Artikel.findAll({
          where: {
            CategoryId: category
          }
        });
      } else {
        artikel = await Artikel.findAll();
      }
      console.log(artikel)
      res.status(200).json(artikel);
    } catch (error) {
      next(error);
    }
  }

  static async updateArtikel(req, res, next) {
    try {
      const { title, description, UserId, imgUrl, CategoryId } = req.body;
      if (!title || !description || !UserId || !imgUrl || !CategoryId) {
        throw {
          name: "ErrorCustom",
          status: 400,
          message: "title/description/UserId/imgUrl/CategoryId cannot be empty!",
        };
      }
      const { id } = req.params;
      const artikel = await Artikel.findByPk(id);
      if (!artikel) {
        throw {name: "Not Found"}
      }
      await Artikel.update({title, description, UserId, imgUrl, CategoryId}, {
        where: { id: id },
      });
      res.status(200).json({ message: `Artikel id ${id} has been updated!` });
    } catch (error) {
      next(error);
    }
  }

  static async deleteArtikel(req, res, next) {
    try {
      const { id } = req.params;
      const artikel = await Artikel.findByPk(id);
      if (!artikel) {
        throw {name: "Not Found"}
      }
      await artikel.destroy();
      res.status(200).json({ message: `Artikel id ${id} has been deleted!` });
    } catch (error) {
      next(error);
    }
  }

  catch(error) {
    next(error);
  }
};
