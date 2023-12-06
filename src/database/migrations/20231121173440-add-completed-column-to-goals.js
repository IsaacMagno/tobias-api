module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn("Goals", "completed", Sequelize.BOOLEAN),
    ]);
  },
  down: function (queryInterface, _Sequelize) {
    return Promise.all([queryInterface.removeColumn("Goals", "completed")]);
  },
};
