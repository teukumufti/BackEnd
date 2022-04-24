"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Products.init(
    {
      image: DataTypes.STRING,
      title: DataTypes.STRING,
      desc: DataTypes.STRING,
      price: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      idUser: DataTypes.INTEGER,
    },
    {
      createdAt: false,
      updatedAt: false,
      sequelize,
      modelName: "Products",
    }
  );
  return Products;
};
