"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("Statistics", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      strength: {
        type: Sequelize.INTEGER,
      },
      agility: {
        type: Sequelize.INTEGER,
      },
      inteligence: {
        type: Sequelize.INTEGER,
      },
      vitality: {
        type: Sequelize.INTEGER,
      },
      wisdow: {
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
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.dropTable("Statistics");
  },
};
