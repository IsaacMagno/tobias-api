module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("Statistics", "wisdow", "wisdom");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("Statistics", "wisdom", "wisdow");
  },
};
