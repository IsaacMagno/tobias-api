module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Quests", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      questName: {
        type: Sequelize.STRING,
      },
      questGoal: {
        type: Sequelize.INTEGER,
      },
      questActual: {
        type: Sequelize.INTEGER,
      },
      questLimitDate: {
        type: Sequelize.DATEONLY,
      },
      completedDate: {
        type: Sequelize.DATEONLY,
      },
      questType: {
        type: Sequelize.ENUM("solo", "group"),
        allowNull: false,
      },
      questReward: {
        type: Sequelize.JSON,
      },
      completed: {
        type: Sequelize.BOOLEAN,
      },
      championId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        field: "champion_id",
        references: {
          model: "Champions",
          key: "id",
        },
      },
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable("Quests");
  },
};
