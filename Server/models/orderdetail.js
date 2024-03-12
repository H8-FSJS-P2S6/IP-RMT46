'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderDetail.belongsTo(models.User, {foreignKey: "UserId"})
      OrderDetail.belongsTo(models.Meal, {foreignKey: "MealId"})
    }
  }
  OrderDetail.init({
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Quantity is required"
        },
        notEmpty: {
          msg: "Quantity is required"
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "User is required"
        },
        notEmpty: {
          msg: "User is required"
        }
      }
    },
    MealId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Meal is required"
        },
        notEmpty: {
          msg: "Meal is required"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'OrderDetail',
  });
  return OrderDetail;
};