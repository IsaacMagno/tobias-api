module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable("Tasks", "Goals");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable("Goals", "Tasks");
  },
};
