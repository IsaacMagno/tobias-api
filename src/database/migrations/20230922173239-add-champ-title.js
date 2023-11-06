module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn("Champions", "title", Sequelize.STRING);
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn("Champions", "title");
  },
};
