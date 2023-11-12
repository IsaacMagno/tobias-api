module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      "Champions",
      "achievementPoints",
      Sequelize.INTEGER
    );
  },
  down: function (queryInterface, _Sequelize) {
    return queryInterface.removeColumn("Champions", "achievementPoints");
  },
};
