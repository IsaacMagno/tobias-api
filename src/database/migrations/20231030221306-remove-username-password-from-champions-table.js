module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.removeColumn("Champions", "username");
    await queryInterface.removeColumn("Champions", "password");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Champions", "username", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("Champions", "password", {
      type: Sequelize.STRING,
    });
  },
};
