module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      "Champions",
      "tobiasCoins",
      Sequelize.FLOAT
    );
  },
  down: function (queryInterface, _Sequelize) {
    return queryInterface.removeColumn("Champions", "tobiasCoins");
  },
};
