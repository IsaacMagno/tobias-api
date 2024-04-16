const { StatsDetails } = require("../database/models");
const getStatsDetailsById = async (id) => {
  try {
    return await StatsDetails.findOne({ where: { champion_id: id } });
  } catch (error) {
    console.error(`Erro ao buscar detalhes de stats do campeão:`, error);
    throw error;
  }
};

module.exports = {
  getStatsDetailsById,
};
