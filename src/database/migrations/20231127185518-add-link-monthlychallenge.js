module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn("MonthlyChallenge", "link", Sequelize.STRING),
    ]);
  },
  down: function (queryInterface, _Sequelize) {
    return Promise.all([
      queryInterface.removeColumn("MonthlyChallenge", "link"),
    ]);
  },
};
