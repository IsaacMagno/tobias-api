module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.removeColumn("Achievements", "date");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Achievements", "date", {
      type: Sequelize.DATEONLY,
    });
  },
};
