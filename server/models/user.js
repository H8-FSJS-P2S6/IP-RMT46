'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Pokemon);
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "Username must be unique"
      },
      allowNull: false,
      validate: {
        notNull: {
          msg: "Username is required"
        },
        notEmpty: {
          msg: "Username is required"
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "Email must be unique"
      },
      allowNull: false,
      validate: {
        notNull: {
          msg: "Email is required"
        },
        notEmpty: {
          msg: "Email is required"
        },
        isEmail: {
          args: true,
          msg: "Invalid email format"
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is required"
        },
        notEmpty: {
          msg: "Password is required"
        },
        isLength: {
          args: { min: 5 },
          msg: "Password min 5 character or more"
        },
      },
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "Trainer"
    },
    coins: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    gender: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Gender is required"
        },
      },
    },
    age: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "Age is required"
        },
      },
    },
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(user) {
        user.password = hashPassword(user.password);
      }
    },
  });
  return User;
};