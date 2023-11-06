module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("Activities", "km_run", "kmRun");
    await queryInterface.renameColumn("Activities", "jump_rope", "jumpRope");
    await queryInterface.renameColumn("Activities", "km_bike", "kmBike");
    await queryInterface.renameColumn("Activities", "upper_limb", "upperLimb");
    await queryInterface.renameColumn("Activities", "lower_limb", "lowerLimb");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("Activities", "kmRun", "km_run");
    await queryInterface.renameColumn("Activities", "jumpRope", "jump_rope");
    await queryInterface.renameColumn("Activities", "kmBike", "km_bike");
    await queryInterface.renameColumn("Activities", "upperLimb", "upper_limb");
    await queryInterface.renameColumn("Activities", "lowerLimb", "lower_limb");
  },
};
