"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Artikel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Artikel.belongsTo(models.User, { foreignKey: "UserId" });
      Artikel.belongsTo(models.Category, { foreignKey: "CategoryId" });
    }
  }
  Artikel.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "title is required" },
          notNull: { args: true, msg: "title is required" },
        },
      },
      UserId: DataTypes.INTEGER,
      imgUrl: DataTypes.STRING,
      CategoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Artikel",
    }
  );
  return Artikel;
};
