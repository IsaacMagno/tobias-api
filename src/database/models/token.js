const { DataTypes, Model } = require("sequelize");
const sequelize = require("./db.js");

class Token extends Model {}

Token.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    token: DataTypes.STRING,
    used: DataTypes.BOOLEAN,
  },
  {
    sequelize,
    tableName: "Tokens",
    timestamps: false,
  }
);

module.exports = Token;
