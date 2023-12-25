const { DataTypes, Model } = require("sequelize");
const sequelize = require("./db.js");

class File extends Model {}

File.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    image: DataTypes.STRING,
  },
  {
    sequelize,
    tableName: "files",
    timestamps: false,
  }
);

module.exports = File;
