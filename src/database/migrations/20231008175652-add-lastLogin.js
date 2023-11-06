module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn("Champions", "lastLogin", Sequelize.DATE);
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn("Champions", "lastLogin");
  },
};
