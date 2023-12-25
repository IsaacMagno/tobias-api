const { DataTypes, Model } = require("sequelize");
const sequelize = require("./db.js");

class MonthlyChallenge extends Model {}

MonthlyChallenge.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    questName: DataTypes.STRING,
    questMonth: DataTypes.STRING,
    questGoal: DataTypes.INTEGER,
    questActual: DataTypes.INTEGER,
    questLimitDate: DataTypes.DATEONLY,
    questReward: DataTypes.JSON,
    completed: DataTypes.BOOLEAN,
    link: DataTypes.STRING,
  },
  {
    sequelize,
    tableName: "monthlychallenge",
    timestamps: false,
  }
);

module.exports = MonthlyChallenge;
