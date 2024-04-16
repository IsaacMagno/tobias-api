"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("StatsDetails", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      intFromStudy: {
        type: Sequelize.FLOAT,
      },
      intFromReading: {
        type: Sequelize.FLOAT,
      },
      intFromMeditation: {
        type: Sequelize.FLOAT,
      },
      strFromUpper: {
        type: Sequelize.FLOAT,
      },
      strFromLower: {
        type: Sequelize.FLOAT,
      },
      strFromAbs: {
        type: Sequelize.FLOAT,
      },
      dexFromRope: {
        type: Sequelize.FLOAT,
      },
      dexFromBike: {
        type: Sequelize.FLOAT,
      },
      dexFromRun: {
        type: Sequelize.FLOAT,
      },
      conFromMeals: {
        type: Sequelize.FLOAT,
      },
      conFromDrinks: {
        type: Sequelize.FLOAT,
      },
      conFromSleep: {
        type: Sequelize.FLOAT,
      },
      championId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        field: "champion_id",
        references: {
          model: "champions",
          key: "id",
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("StatsDetails");
  },
};
