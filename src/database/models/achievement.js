const { DataTypes, Model } = require("sequelize");
const sequelize = require("./db.js");

class Achievement extends Model {}

Achievement.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    rewards: DataTypes.JSON,
    date: DataTypes.DATEONLY,
    icon: DataTypes.STRING,
  },
  {
    sequelize,
    tableName: "Achievements",
    timestamps: false,
  }
);

module.exports = Achievement;
