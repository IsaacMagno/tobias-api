const { DataTypes, Model } = require("sequelize");
const sequelize = require("./db.js");

class Activitie extends Model {}

Activitie.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    kmRun: DataTypes.FLOAT,
    jumpRope: DataTypes.FLOAT,
    kmBike: DataTypes.FLOAT,
    upperLimb: DataTypes.FLOAT,
    abs: DataTypes.FLOAT,
    lowerLimb: DataTypes.FLOAT,
    meals: DataTypes.FLOAT,
    drinks: DataTypes.FLOAT,
    sleep: DataTypes.FLOAT,
    study: DataTypes.FLOAT,
    meditation: DataTypes.FLOAT,
    reading: DataTypes.FLOAT,
  },
  {
    sequelize,
    tableName: "Activities",
    timestamps: false,
  }
);

module.exports = Activitie;
