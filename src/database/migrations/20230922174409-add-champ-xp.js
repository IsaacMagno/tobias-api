module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn("Champions", "xp", Sequelize.FLOAT);
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn("Champions", "xp");
  },
};
