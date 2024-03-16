'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Proof, {foreignKey: 'userId'})
      User.hasMany(models.Cart, {foreignKey: 'userId'})
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Email must be unique",
      },
      validate: {
        notNull: {
          msg: "Email is required",
          args: true,
        },
        notEmpty: {
          msg: "Email is required",
          args: true,
        },
        isEmail: {
          args: true,
          msg: "Invalid email format",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is required",
          args: true,
        },
        notEmpty: {
          msg: "Password is required",
          args: true,
        },
      },
    },
  }, {
    hooks: {
      beforeCreate(user) {
        user.password = hashPassword(user.password);
      },
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};