const { Cart, Product } = require("../models");

class CartController{
    static async getAllItems(req, res, next) {
        try {
          const items = await Cart.findAll({
            where: {
              userId: req.user.id
            },
            
            include: {
              model: Product,
            }
          });
          res.json(items);
        } catch (error) {
          next(error);
        }
      }
    
      static async getItemById(req, res, next) {
        try {
          const { id } = req.params;
          const items = await Cart.findByPk(id);
          res.json(items);
        } catch (error) {
          next(error);
        }
      }

      static async createItems(req, res, next) {
        try {

          const items = await Cart.create({...req.body});
          res.status(201).json(items);
        } catch (error) {
          next(error);
        }
      }

      static async deleteItemById(req, res, next) {
          const { id } = req.params;
        try {
          const items = await Cart.findByPk(id);
          await items.destroy({
            where: {
              id: id,
            },
          });
          res
            .status(200)
            .json({ message: `Item has been deleted` });
        } catch (error) {
          next(error);
        }
      }

      static async updateItemById(req, res, next) {
        const { id } = req.params;
        try {
          const items = await Cart.findByPk(id);
          await items.update(req.body);
          res
            .status(200)
            .json({ message: `Item has been updated` });
        } catch (error) {
          next(error);
        }
      }
}

module.exports = CartController
