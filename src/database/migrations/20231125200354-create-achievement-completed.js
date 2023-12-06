module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("AchievementsCompleted", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.DATEONLY,
      },
      achievementId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        field: "achievement_id",
        references: {
          model: "Achievements",
          key: "id",
        },
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
    await queryInterface.dropTable("AchievementsCompleted");
  },
};
