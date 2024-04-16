module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("quests", "questGoal", {
      type: Sequelize.FLOAT,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("quests", "questGoal", {
      type: Sequelize.INTEGER,
    });
  },
};
