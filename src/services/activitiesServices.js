const { Activitie } = require("../database/models");

/**
 * Atualiza as atividades de um campeão.
 * @param {number} champion_id - O ID do campeão.
 * @param {string} stats - A estatística a ser atualizada.
 * @param {number} value - O valor a ser adicionado à estatística.
 * @returns {object} Retorna as estatísticas atualizadas do campeão.
 */
const updateActivities = async (champion_id, stats, value) => {
  try {
    // Buscar as estatísticas antigas
    const oldStats = await Activitie.findAll({
      where: { champion_id },
      raw: true,
    });

    // Verificar se as estatísticas antigas existem
    if (!oldStats || oldStats.length === 0) {
      throw new Error("No old stats found for the given champion_id");
    }

    const { [stats]: oldStat } = oldStats[0];

    // Atualizar as estatísticas
    await Activitie.update(
      { [stats]: value + oldStat },
      { where: { champion_id } }
    );

    // Buscar as estatísticas atualizadas
    const statsUpdated = await Activitie.findAll({
      where: { champion_id },
      raw: true,
    });

    return statsUpdated;
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
const findActivityById = async (id) => {
  // Busca a atividade pelo ID do campeão
  const activity = await Activitie.findOne({
    where: { champion_id: id },
    raw: true,
  });
  return activity;
};

/**
 * Cria atividades para um campeão.
 * @param {number} id - O ID do campeão.
 * @returns {object} Retorna as atividades criadas.
 * @throws {Error} Lança um erro se o campeão já tiver atividades ou se ocorrer um problema ao criar as atividades.
 */
const createActivities = async (id) => {
  try {
    // Verifica se o campeão já tem atividades
    const championAlreadyHaveActivities = await findActivityById(id);

    if (championAlreadyHaveActivities) {
      throw new Error(`O campeão com ID ${id} já tem atividades!`);
    }

    // Cria as atividades para o campeão
    const createdActivities = await Activitie.create({
      kmRun: 0,
      jumpRope: 0,
      kmBike: 0,
      upperLimb: 0,
      abs: 0,
      lowerLimb: 0,
      meals: 0,
      drinks: 0,
      study: 0,
      meditation: 0,
      reading: 0,
      sleep: 0,
      champion_id: id,
    });

    return createdActivities;
  } catch (error) {
    console.error(`Erro ao criar atividades para o campeão ${id}:`, error);
    throw error;
  }
};

module.exports = {
  updateActivities,
  createActivities,
};
