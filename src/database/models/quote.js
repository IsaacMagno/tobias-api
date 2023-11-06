const { DataTypes, Model } = require("sequelize");
const sequelize = require("./db.js");

class Quote extends Model {}

Quote.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    quote: DataTypes.TEXT,
    author: DataTypes.STRING,
  },
  {
    sequelize,
    tableName: "Quotes",
    timestamps: false,
  }
);

module.exports = Quote;
