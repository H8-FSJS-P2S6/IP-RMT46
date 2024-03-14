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
      const categories = await Category.findAll();
      res.status(200).json(categories);
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
    const categoryId = req.params.id;
    const Categories = await Category.findByPk(categoryId);
    if (!Categories) {
      throw {
        name: "ErrorCustom",
        status: 404,
        message: `Category id ${categoryId} not found`,
      };
    }
    const updateCategory = await Category.update(req.body, {
      where: { id: categoryId },
    });
    console.log(updateCategory);
    res
      .status(200)
      .json({ message: `Products id ${categoryId} has been updated!` });
  }

  static async deleteCategory(req, res, next) {
    try {
      const categories = await Category.findAll();
      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }

  catch(error) {
    next(error);
  }
};
