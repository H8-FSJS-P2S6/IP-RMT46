"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Artikel, { foreignKey: "UserId" });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "email is required" },
          notNull: { args: true, msg: "email is required" },
          isEmail: { args: true, msg: "invalid email format" },
        }, unique: {
          args: true,
          msg: "email must be unique",
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "password is required" },
          notNull: { args: true, msg: "password is required" },
          len: {
            args: [6],
            msg: "password must be at least 6 characters",
          },
        },
      },
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
      sso: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
