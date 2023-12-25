module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn("quotes", "championId", Sequelize.INTEGER),
    ]);
  },
  down: function (queryInterface, _Sequelize) {
    return Promise.all([queryInterface.removeColumn("quotes", "championId")]);
  },
};
