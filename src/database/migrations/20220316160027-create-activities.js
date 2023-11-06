"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("Activities", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      km_run: {
        type: Sequelize.INTEGER,
      },
      jump_rope: {
        type: Sequelize.INTEGER,
      },
      km_bike: {
        type: Sequelize.INTEGER,
      },
      upper_limb: {
        type: Sequelize.INTEGER,
      },
      abs: {
        type: Sequelize.INTEGER,
      },
      lower_limb: {
        type: Sequelize.INTEGER,
      },
      meals: {
        type: Sequelize.INTEGER,
      },
      drinks: {
        type: Sequelize.INTEGER,
      },
      study: {
        type: Sequelize.INTEGER,
      },
      meditation: {
        type: Sequelize.INTEGER,
      },
      reading: {
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
    return queryInterface.dropTable("Activities");
  },
};
