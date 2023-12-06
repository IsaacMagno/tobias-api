const { DataTypes, Model } = require("sequelize");
const sequelize = require("./db.js");

class Achievement extends Model {}

Achievement.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    rewards: DataTypes.JSON,
    icon: DataTypes.STRING,
    link: DataTypes.STRING,
    goal: DataTypes.INTEGER,
  },
  {
    sequelize,
    tableName: "Achievements",
    timestamps: false,
  }
);

module.exports = Achievement;
