module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn("Goals", "completedDate", Sequelize.DATEONLY),
    ]);
  },
  down: function (queryInterface, _Sequelize) {
    return Promise.all([queryInterface.removeColumn("Goals", "completedDate")]);
  },
};
