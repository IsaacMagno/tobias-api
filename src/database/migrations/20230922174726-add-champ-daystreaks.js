module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      "Champions",
      "daystreak",
      Sequelize.INTEGER
    );
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn("Champions", "daystreak");
  },
};
