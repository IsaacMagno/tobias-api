const { DataTypes, Model } = require("sequelize");
const sequelize = require("./db.js");

class DailyActivity extends Model {}

DailyActivity.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    study: DataTypes.FLOAT,
    reading: DataTypes.FLOAT,
    meditation: DataTypes.FLOAT,
    upperLimb: DataTypes.FLOAT,
    lowerLimb: DataTypes.FLOAT,
    abs: DataTypes.FLOAT,
    jumpRope: DataTypes.FLOAT,
    kmBike: DataTypes.FLOAT,
    kmRun: DataTypes.FLOAT,
    meals: DataTypes.FLOAT,
    drinks: DataTypes.FLOAT,
    sleep: DataTypes.FLOAT,
  },
  {
    sequelize,
    tableName: "DailyActivities",
    timestamps: false,
  }
);

module.exports = DailyActivity;
