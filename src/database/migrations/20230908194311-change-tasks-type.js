module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn("Tasks", "month", {
        type: Sequelize.FLOAT,
      }),
      queryInterface.changeColumn("Tasks", "week", {
        type: Sequelize.FLOAT,
      }),
      queryInterface.changeColumn("Tasks", "daily", {
        type: Sequelize.FLOAT,
      }),
    ]);
  },

  down: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn("Tasks", "month", {
        type: Sequelize.INTEGER,
      }),
      queryInterface.changeColumn("Tasks", "week", {
        type: Sequelize.INTEGER,
      }),
      queryInterface.changeColumn("Tasks", "daily", {
        type: Sequelize.INTEGER,
      }),
    ]);
  },
};
