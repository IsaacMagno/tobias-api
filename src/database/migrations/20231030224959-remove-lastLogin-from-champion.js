module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.removeColumn("Champions", "lastLogin");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Champions", "lastLogin", {
      type: Sequelize.STRING,
    });
  },
};
