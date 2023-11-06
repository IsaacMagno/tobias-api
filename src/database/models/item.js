const { DataTypes, Model } = require("sequelize");
const sequelize = require("./db.js");

class Item extends Model {}

Item.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    store: {
      type: DataTypes.ENUM,
      values: ["tobiasStore", "championsStore"],
      allowNull: false,
    },
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    price: DataTypes.FLOAT,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    characteristics: DataTypes.JSON,
    requirements: DataTypes.JSON,
  },
  {
    sequelize,
    tableName: "Items",
    timestamps: false,
  }
);

module.exports = Item;
