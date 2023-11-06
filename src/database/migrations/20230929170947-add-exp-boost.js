module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn("Champions", "xpBoost", Sequelize.FLOAT);
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn("Champions", "xpBoost");
  },
};
