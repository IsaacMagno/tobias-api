const { DataTypes, Model } = require("sequelize");
const sequelize = require("./db.js");

class Quest extends Model {}

Quest.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    questName: DataTypes.STRING,
    questGoal: DataTypes.INTEGER,
    questActual: DataTypes.INTEGER,
    questLimitDate: DataTypes.DATEONLY,
    questReward: DataTypes.JSON,
    completed: DataTypes.BOOLEAN,
    completedDate: DataTypes.DATEONLY,
    link: DataTypes.STRING,
  },
  {
    sequelize,
    tableName: "quests",
    timestamps: false,
  }
);

module.exports = Quest;
