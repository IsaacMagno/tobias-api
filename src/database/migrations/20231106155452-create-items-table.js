module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Items", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      store: {
        type: Sequelize.ENUM("tobiasStore", "championsStore"),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
      },
      category: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.FLOAT,
      },
      description: {
        type: Sequelize.TEXT,
      },
      image: {
        type: Sequelize.STRING,
      },
      characteristics: {
        type: Sequelize.TEXT,
        get: function () {
          return JSON.parse(this.getDataValue("characteristics"));
        },
        set: function (value) {
          this.setDataValue("characteristics", JSON.stringify(value));
        },
      },
      requirements: {
        type: Sequelize.TEXT,
        get: function () {
          return JSON.parse(this.getDataValue("requirements"));
        },
        set: function (value) {
          this.setDataValue("requirements", JSON.stringify(value));
        },
      },
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable("Items");
  },
};
