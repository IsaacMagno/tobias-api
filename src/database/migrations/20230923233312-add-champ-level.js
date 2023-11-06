module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn("Champions", "level", Sequelize.INTEGER);
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn("Champions", "level");
  },
};
