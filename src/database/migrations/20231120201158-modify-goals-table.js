module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        "Goals",
        "stats",
        Sequelize.ENUM("DEX", "STR", "INT", "CON", "Nenhum")
      ),
      queryInterface.addColumn("Goals", "link", Sequelize.STRING),
    ]);
  },
  down: function (queryInterface, _Sequelize) {
    return Promise.all([
      queryInterface.removeColumn("Goals", "stats"),
      queryInterface.removeColumn("Goals", "link"),
    ]);
  },
};
