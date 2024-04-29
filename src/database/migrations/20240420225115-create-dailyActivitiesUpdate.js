"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("DailyActivities", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.DATEONLY,
      },
      study: {
        type: Sequelize.FLOAT,
      },
      reading: {
        type: Sequelize.FLOAT,
      },
      meditation: {
        type: Sequelize.FLOAT,
      },
      upperLimb: {
        type: Sequelize.FLOAT,
      },
      lowerLimb: {
        type: Sequelize.FLOAT,
      },
      abs: {
        type: Sequelize.FLOAT,
      },
      jumpRope: {
        type: Sequelize.FLOAT,
      },
      kmBike: {
        type: Sequelize.FLOAT,
      },
      kmRun: {
        type: Sequelize.FLOAT,
      },
      meals: {
        type: Sequelize.FLOAT,
      },
      drinks: {
        type: Sequelize.FLOAT,
      },
      sleep: {
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
    await queryInterface.dropTable("DailyActivities");
  },
};
