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
    stats: {
      type: DataTypes.ENUM,
      values: ["DEX", "STR", "INT", "CON", "Nenhum"],
      allowNull: false,
    },
    link: DataTypes.STRING,
    completed: DataTypes.BOOLEAN,
    completedDate: DataTypes.DATEONLY,
  },
  {
    sequelize,
    tableName: "Goals",
    timestamps: false,
  }
);

module.exports = Goal;
