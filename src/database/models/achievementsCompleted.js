const { DataTypes, Model } = require("sequelize");
const sequelize = require("./db.js");

class AchievementsCompleted extends Model {}

AchievementsCompleted.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date: DataTypes.DATEONLY,
  },
  {
    sequelize,
    tableName: "AchievementsCompleted",
    timestamps: false,
    underscored: true,
  }
);

module.exports = AchievementsCompleted;
