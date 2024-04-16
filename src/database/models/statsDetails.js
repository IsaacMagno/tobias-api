const { DataTypes, Model } = require("sequelize");
const sequelize = require("./db.js");

class StatsDetails extends Model {}

StatsDetails.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    intFromStudy: DataTypes.FLOAT,
    intFromReading: DataTypes.FLOAT,
    intFromMeditation: DataTypes.FLOAT,
    strFromUpper: DataTypes.FLOAT,
    strFromLower: DataTypes.FLOAT,
    strFromAbs: DataTypes.FLOAT,
    dexFromRope: DataTypes.FLOAT,
    dexFromBike: DataTypes.FLOAT,
    dexFromRun: DataTypes.FLOAT,
    conFromMeals: DataTypes.FLOAT,
    conFromDrinks: DataTypes.FLOAT,
    conFromSleep: DataTypes.FLOAT,
  },
  {
    sequelize,
    tableName: "StatsDetails",
    timestamps: false,
  }
);

module.exports = StatsDetails;
