module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      "Champions",
      "lastDaystreakUpdate",
      Sequelize.DATE
    );
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn("Champions", "lastDaystreakUpdate");
  },
};
