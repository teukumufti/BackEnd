"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Products, {
        as: "product",
        foreignKey: {
          name: "idProducts",
        },
      });
      this.belongsTo(models.User, {
        as: "buyer",
        foreignKey: {
          name: "idBuyer",
        },
      });
      this.belongsTo(models.User, {
        as: "seller",
        foreignKey: {
          name: "idSeller",
        },
      });
    }
  }
  Transaction.init(
    {
      idProduct: DataTypes.INTEGER,
      idBuyer: DataTypes.INTEGER,
      idSeller: DataTypes.INTEGER,
      status: DataTypes.STRING,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
