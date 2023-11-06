"use strict";

module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn("Activities", "sleep", {
        type: Sequelize.INTEGER,
      }),
    ]);
  },

  down(queryInterface, Sequelize) {
    return Promisse.all([queryInterface.removeColumn("Activities", "sleep")]);
  },
};
