const { DataTypes, Model } = require("sequelize");
const sequelize = require("./db.js");

class Quote extends Model {}

Quote.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    quote: DataTypes.TEXT,
    author: DataTypes.STRING,
    championId: DataTypes.INTEGER,
  },
  {
    sequelize,
    tableName: "quotes",
    timestamps: false,
  }
);

module.exports = Quote;
