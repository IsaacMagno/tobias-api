module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn("Activities", "km_run", {
        type: Sequelize.FLOAT,
      }),
      queryInterface.changeColumn("Activities", "jump_rope", {
        type: Sequelize.FLOAT,
      }),
      queryInterface.changeColumn("Activities", "km_bike", {
        type: Sequelize.FLOAT,
      }),
      queryInterface.changeColumn("Activities", "upper_limb", {
        type: Sequelize.FLOAT,
      }),
      queryInterface.changeColumn("Activities", "abs", {
        type: Sequelize.FLOAT,
      }),
      queryInterface.changeColumn("Activities", "lower_limb", {
        type: Sequelize.FLOAT,
      }),
      queryInterface.changeColumn("Activities", "meals", {
        type: Sequelize.FLOAT,
      }),
      queryInterface.changeColumn("Activities", "drinks", {
        type: Sequelize.FLOAT,
      }),
      queryInterface.changeColumn("Activities", "sleep", {
        type: Sequelize.FLOAT,
      }),
      queryInterface.changeColumn("Activities", "study", {
        type: Sequelize.FLOAT,
      }),
      queryInterface.changeColumn("Activities", "meditation", {
        type: Sequelize.FLOAT,
      }),
      queryInterface.changeColumn("Activities", "reading", {
        type: Sequelize.FLOAT,
      }),
    ]);
  },

  down: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn("Activities", "km_run", {
        type: Sequelize.INTEGER,
      }),
      queryInterface.changeColumn("Activities", "jump_rope", {
        type: Sequelize.INTEGER,
      }),
      queryInterface.changeColumn("Activities", "km_bike", {
        type: Sequelize.INTEGER,
      }),
      queryInterface.changeColumn("Activities", "upper_limb", {
        type: Sequelize.INTEGER,
      }),
      queryInterface.changeColumn("Activities", "abs", {
        type: Sequelize.INTEGER,
      }),
      queryInterface.changeColumn("Activities", "lower_limb", {
        type: Sequelize.INTEGER,
      }),
      queryInterface.changeColumn("Activities", "meals", {
        type: Sequelize.INTEGER,
      }),
      queryInterface.changeColumn("Activities", "drinks", {
        type: Sequelize.INTEGER,
      }),
      queryInterface.changeColumn("Activities", "sleep", {
        type: Sequelize.INTEGER,
      }),
      queryInterface.changeColumn("Activities", "study", {
        type: Sequelize.INTEGER,
      }),
      queryInterface.changeColumn("Activities", "meditation", {
        type: Sequelize.INTEGER,
      }),
      queryInterface.changeColumn("Activities", "reading", {
        type: Sequelize.INTEGER,
      }),
    ]);
  },
};
