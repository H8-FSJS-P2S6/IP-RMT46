const { Product} = require("../models");

class ProductController {
  static async getAllProduct(req, res, next) {
    try {
      const products = await Product.findAll();
      res.json(products);
    } catch (error) {
      next(error);
    }
  }

  static async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      if (!product) {
        throw {
          name: "NotFound",
        };
      }
      res.json(product);
    } catch (error) {
      next(error);
    }
  }

}

module.exports = ProductController;
