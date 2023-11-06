module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      "Champions",
      "daystreakShield",
      Sequelize.INTEGER
    );
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn("Champions", "daystreakShield");
  },
};
