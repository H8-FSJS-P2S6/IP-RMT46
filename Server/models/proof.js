'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Proof extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Proof.belongsTo(models.User, {foreignKey: 'userId'})
    }
  }
  Proof.init({
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg:"ImageUrl is required"},
        notEmpty: {msg:"ImageUrl is required"},
      },
    },
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
    }
  }, {
    sequelize,
    modelName: 'Proof',
  });
  return Proof;
};