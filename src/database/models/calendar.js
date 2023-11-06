const { DataTypes, Model } = require("sequelize");
const sequelize = require("./db.js");

class Calendar extends Model {}

Calendar.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    red_day: DataTypes.INTEGER,
    yellow_day: DataTypes.INTEGER,
    green_day: DataTypes.INTEGER,
  },
  {
    sequelize,
    tableName: "Calendars",
    timestamps: false,
  }
);

module.exports = Calendar;
