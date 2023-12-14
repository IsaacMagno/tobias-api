"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ActivitiesIntensity", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      kmRun: {
        type: Sequelize.FLOAT,
      },
      jumpRope: {
        type: Sequelize.FLOAT,
      },
      kmBike: {
        type: Sequelize.FLOAT,
      },
      upperLimb: {
        type: Sequelize.FLOAT,
      },
      abs: {
        type: Sequelize.FLOAT,
      },
      lowerLimb: {
        type: Sequelize.FLOAT,
      },
      meals: {
        type: Sequelize.FLOAT,
      },
      drinks: {
        type: Sequelize.FLOAT,
      },
      study: {
        type: Sequelize.FLOAT,
      },
      meditation: {
        type: Sequelize.FLOAT,
      },
      reading: {
        type: Sequelize.FLOAT,
      },
      championId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        field: "champion_id",
        references: {
          model: "Champions",
          key: "id",
        },
      },
      sleep: {
        type: Sequelize.FLOAT,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("ActivitiesIntensity");
  },
};
