"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const ChampionsTable = queryInterface.createTable("Champions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      bornDate: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      googleId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });

    return ChampionsTable;
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable("Champions");
  },
};
