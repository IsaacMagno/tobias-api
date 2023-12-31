module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Practice");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Practice", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      image: {
        type: Sequelize.STRING,
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
};
