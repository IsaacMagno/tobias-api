module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.removeColumn("quests", "questType");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("quests", "questType", {
      type: Sequelize.ENUM,
    });
  },
};
