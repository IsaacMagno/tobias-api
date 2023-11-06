const { DataTypes, Model } = require("sequelize");
const sequelize = require("./db.js");

class Event extends Model {}

Event.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    date: DataTypes.STRING,
    display: DataTypes.STRING,
    backgroundColor: DataTypes.STRING,
  },
  {
    sequelize,
    tableName: "Events",
    timestamps: false,
  }
);

module.exports = Event;
