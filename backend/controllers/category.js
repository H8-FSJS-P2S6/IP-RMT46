const { Category } = require("../models");

module.exports = class CategoryController {
  static async createCategory(req, res, next) {
    try {
      const { name } = req.body;
      if (!name) {
        throw {
          name: "ErrorCustom",
          status: 400,
          message: "Name cannot be empty!",
        };
      }
      const existingCategory = await Category.findOne({
        where: { name: name },
      });
      if (existingCategory) {
        throw {
          name: "ErrorCustom",
          status: 409,
          message: "Category already exists!",
        };
      }

      const createCategory = await Category.create({ name });
      res.status(201).json(createCategory);
    } catch (error) {
      next(error);
    }
  }

  static async getCategory(req, res, next) {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }

  static async listCategory(req, res, next) {
    try {
      const categories = await Category.findAll();
      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }

  static async updateCategory(req, res, next) {
    try {
      const { name } = req.body;
      if (!name) {
        throw {
          name: "ErrorCustom",
          status: 400,
          message: "Name cannot be empty!",
        };
      }
      const { id } = req.params;
      const category = await Category.findByPk(id);
      if (!category) {
        throw {name: "Not Found"}
      }
      await Category.update({name}, {
        where: { id: id },
      });
      res.status(200).json({ message: `Category id ${id} has been updated!` });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);
      if (!category) {
        throw {name: "Not Found"}
      }
      await category.destroy();
      res.status(200).json({ message: `Category id ${id} has been deleted!` });
    } catch (error) {
      next(error);
    }
  }

  catch(error) {
    next(error);
  }
};
