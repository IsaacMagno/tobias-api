module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Achievements", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      rewards: {
        type: Sequelize.TEXT,
        get: function () {
          return JSON.parse(this.getDataValue("rewards"));
        },
        set: function (value) {
          this.setDataValue("rewards", JSON.stringify(value));
        },
      },
      date: {
        type: Sequelize.DATEONLY,
      },
      icon: {
        type: Sequelize.STRING,
      },
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable("Achievements");
  },
};
