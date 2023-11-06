const { DataTypes, Model } = require("sequelize");
const sequelize = require("./db.js");

class Goal extends Model {}

Goal.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    goal: DataTypes.INTEGER,
    month: DataTypes.FLOAT,
    week: DataTypes.FLOAT,
    daily: DataTypes.FLOAT,
    actual: DataTypes.INTEGER,
  },
  {
    sequelize,
    tableName: "Goals",
    timestamps: false,
  }
);

module.exports = Goal;
