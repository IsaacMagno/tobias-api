module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      "champions",
      "lastFreeQuestUpdate",
      Sequelize.DATE
    );
  },
  down: function (queryInterface, _Sequelize) {
    return queryInterface.removeColumn("champions", "lastFreeQuestUpdate");
  },
};
