const { DataTypes, Model } = require("sequelize");
const sequelize = require("./db.js");

class Champion extends Model {}

Champion.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    bornDate: DataTypes.STRING,
    title: DataTypes.STRING,
    xp: DataTypes.FLOAT,
    xpBoost: DataTypes.FLOAT,
    level: DataTypes.INTEGER,
    daystreak: DataTypes.INTEGER,
    lastDaystreakUpdate: DataTypes.DATE,
    biography: DataTypes.TEXT,
    daystreakShield: DataTypes.INTEGER,
    tobiasCoins: DataTypes.FLOAT,
    achievementPoints: DataTypes.INTEGER,
  },
  {
    sequelize,
    tableName: "champions",
    timestamps: false,
  }
);

module.exports = Champion;
