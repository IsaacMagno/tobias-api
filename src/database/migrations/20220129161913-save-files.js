"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const FilesTable = queryInterface.createTable("Files", {
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

    return FilesTable;
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable("Files");
  },
};
