const { Activitie } = require("../database/models");

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
  createActivities,
};
