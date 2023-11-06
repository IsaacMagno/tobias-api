"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const CalendarTable = queryInterface.createTable("Calendars", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      red_day: {
        type: Sequelize.INTEGER,
      },
      yellow_day: {
        type: Sequelize.INTEGER,
      },
      green_day: {
        type: Sequelize.INTEGER,
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
    });

    return CalendarTable;
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable("Calendars");
  },
};
