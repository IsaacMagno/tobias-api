"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const EventTable = queryInterface.createTable("Events", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      date: {
        type: Sequelize.STRING,
      },
      display: {
        type: Sequelize.STRING,
      },
      background_color: {
        type: Sequelize.STRING,
      },
      calendar_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        field: "calendar_id",
        references: {
          model: "Calendars",
          key: "id",
        },
      },
    });

    return EventTable;
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable("Events");
  },
};
