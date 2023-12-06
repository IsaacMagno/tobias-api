module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn("Quests", "link", Sequelize.STRING),
    ]);
  },
  down: function (queryInterface, _Sequelize) {
    return Promise.all([queryInterface.removeColumn("Quests", "link")]);
  },
};
