'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Cart, {foreignKey: 'productId'})
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg:"Name is required"},
        notEmpty: {msg:"Name is required"},
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg:"Price is required"},
        notEmpty: {msg:"Price is required"},
      },
    },
    description: {
      type:DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {msg:"Description is required"},
        notEmpty: {msg:"Description is required"},
      },
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg:"ImageUrl is required"},
        notEmpty: {msg:"ImageUrl is required"},
      },
    },
    usage: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg:"Usage is required"},
        notEmpty: {msg:"Usage is required"},
      },
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};