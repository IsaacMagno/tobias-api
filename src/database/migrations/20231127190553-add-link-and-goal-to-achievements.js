module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn("Achievements", "link", Sequelize.STRING),
      queryInterface.addColumn("Achievements", "goal", Sequelize.INTEGER),
    ]);
  },
  down: function (queryInterface, _Sequelize) {
    return Promise.all([
      queryInterface.removeColumn("Achievements", "link"),
      queryInterface.removeColumn("Achievements", "goal"),
    ]);
  },
};
