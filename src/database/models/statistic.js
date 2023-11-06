const { DataTypes, Model } = require("sequelize");
const sequelize = require("./db.js");

class Statistic extends Model {}

Statistic.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    strength: DataTypes.INTEGER,
    agility: DataTypes.INTEGER,
    inteligence: DataTypes.INTEGER,
    vitality: DataTypes.INTEGER,
    wisdom: DataTypes.INTEGER,
  },
  {
    sequelize,
    tableName: "Statistics",
    timestamps: false,
  }
);

module.exports = Statistic;
