module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn("Tasks", "daily", Sequelize.INTEGER);
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn("Tasks", "daily");
  },
};
