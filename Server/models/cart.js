'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User, {foreignKey: 'userId'})
      Cart.belongsTo(models.Product, {foreignKey: 'productId'})
    }
  }
  Cart.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg:"UserId is required"},
        notEmpty: {msg:"UserId is required"},
      },
      references:{
        model:'User',
        key:'id'
      },
      onUpdate:'CASCADE',
      onDelete:'CASCADE'
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg:"ProductId is required"},
        notEmpty: {msg:"ProductId is required"},
      },
      references:{
        model:'Product',
        key:'id'
      },
      onUpdate:'CASCADE',
      onDelete:'CASCADE'
    },
    quantity: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};