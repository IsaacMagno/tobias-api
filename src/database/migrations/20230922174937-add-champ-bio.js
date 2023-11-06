module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn("Champions", "biography", Sequelize.STRING);
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn("Champions", "biography");
  },
};
