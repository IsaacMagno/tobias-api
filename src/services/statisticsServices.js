const { Statistic } = require("../database/models");
const { statsRefactor } = require("../helpers/statsRefactor");
const { getChampionByIdFull } = require("./championService");

/**
 * Atualiza as estatísticas de um campeão.
 * @param {object[]} activities - As atividades do campeão.
 * @returns {Promise} Retorna uma promessa que resolve quando todas as estatísticas são atualizadas.
 */
const updateStatistic = async (activities) => {
  try {
    const { id } = activities;

    // Buscar as estatísticas atuais
    const actualStats = await Statistic.findAll({
      where: { champion_id: id },
      raw: true,
    });

    // Refatorar as estatísticas
    const valuesToUpdate = await statsRefactor(activities, actualStats, id);

    const valuesToArray = Object.entries(valuesToUpdate);

    // Atualizar cada estatística
    const updatePromises = valuesToArray.map(async (stat) => {
      const [stats, value] = stat;
      await Statistic.update(
        { [stats]: [value] },
        { where: { champion_id: id } }
      );
    });

    // // Aguardar todas as atualizações
    await Promise.all(updatePromises);

    // Buscar os dados do campeão atualizados
    const championUpdated = await getChampionByIdFull(id);

    return championUpdated;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Encontra uma atividade pelo ID do campeão.
 * @param {number} id - O ID do campeão.
 * @returns {object} Retorna a atividade se encontrada, null caso contrário.
 */
const findStatisticById = async (id) => {
  // Busca a atividade pelo ID do campeão
  const statistic = await Statistic.findOne({
    where: { champion_id: id },
    raw: true,
  });
  return statistic;
};

/**
 * Cria Estatísticas para um campeão.
 * @param {number} id - O ID do campeão.
 * @returns {object} Retorna as Estatísticas criadas.
 * @throws {Error} Lança um erro se o campeão já tiver Estatísticas ou se ocorrer um problema ao criar as Estatísticas.
 */
const createStatistics = async (id) => {
  try {
    // Verifica se o campeão já tem estatísticas
    const championAlreadyHaveStatistics = await findStatisticById(id);

    if (championAlreadyHaveStatistics) {
      throw new Error(`O campeão com ID ${id} já tem estatísticas!`);
    }

    // Cria as estatísticas para o campeão
    const createdStatistics = await Statistic.create({
      strength: 0,
      agility: 0,
      inteligence: 0,
      vitality: 0,
      wisdom: 0,
      champion_id: id,
    });

    return createdStatistics;
  } catch (error) {
    console.error(`Erro ao criar estatísticas para o campeão ${id}:`, error);
    throw error;
  }
};

module.exports = {
  updateStatistic,
  createStatistics,
  findStatisticById,
};
