module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn("Champions", "biography", {
        type: Sequelize.TEXT,
      }),
    ]);
  },

  down: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn("Champions", "biography", {
        type: Sequelize.STRING,
      }),
    ]);
  },
};
