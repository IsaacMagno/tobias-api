const { DataTypes, Model } = require("sequelize");
const sequelize = require("./db.js");

class Authentication extends Model {}

Authentication.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    lastLogin: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "authentication",
    timestamps: false,
  }
);

module.exports = Authentication;
