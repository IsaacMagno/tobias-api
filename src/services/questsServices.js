const { Quests } = require("../database/models");

/**
 * Busca todas as quests.
 * @returns {Array} Retorna um array de quests se encontrado, null caso contrário.
 */
const getAllQuests = async () => {
  try {
    const quests = await Quests.findAll();
    return quests;
  } catch (error) {
    console.error(`Erro ao buscar todos as quests: ${error}`);
    throw error;
  }
};

/**
 * Busca uma quest pelo ID.
 * @param {number} id - O ID da quest.
 * @returns {object} Retorna a quest se encontrada, null caso contrário.
 */
const getQuestById = async (id) => {
  try {
    const quest = await Quests.findByPk(id);
    return quest;
  } catch (error) {
    console.error(`Erro ao buscar a quest: ${error}`);
    throw error;
  }
};

/**
 * Cria uma nova quest.
 * @param {object} newQuest - O objeto da nova quest.
 * @returns {object} Retorna a quest criada.
 */
const createQuest = async (newQuest) => {
  try {
    const quest = await Quests.create(newQuest);
    return quest;
  } catch (error) {
    console.error(`Erro ao criar a quest: ${error}`);
    throw error;
  }
};

/**
 * Atualiza uma quest existente.
 * @param {number} id - O ID da quest.
 * @param {object} updatedQuest - O objeto da quest atualizada.
 * @returns {object} Retorna a quest atualizada.
 */
const updateQuest = async (id, { questData }) => {
  try {
    const quest = await getQuestById(id);

    const questDataUpdate = { actual: quest.actual + parseInt(questData) };

    if (questDataUpdate.actual === quest.goal) {
      questDataUpdate.completed = true;
      questDataUpdate.completedDate = new Date();
    }

    await Quests.update(questDataUpdate, { where: { id } });

    return await getQuestById(id);
  } catch (error) {
    console.error(`Erro ao atualizar a quest: ${error}`);
    throw error;
  }
};

/**
 * Deleta uma quest.
 * @param {number} id - O ID da quest.
 */
const deleteQuest = async (id) => {
  try {
    await Quests.destroy({ where: { id } });
  } catch (error) {
    console.error(`Erro ao deletar a quest: ${error}`);
    throw error;
  }
};

/**
 * Atualiza uma quest com base no link.
 * @param {number} id - O ID do campeão.
 * @param {string} stats - As estatísticas.
 * @param {number} value - O valor a ser atualizado.
 * @throws {Error} Lança um erro se houver algum problema ao atualizar a quest.
 */
const updateQuestByLink = async (id, stats, value) => {
  try {
    // Busca todas as quests que têm o link correspondente
    const quests = await Quests.findAll({
      where: { champion_id: id, link: stats },
      raw: true,
    });

    // Itera sobre todas as quests
    for (const quest of quests) {
      // Atualiza cada quest
      await updateQuest(quest.id, { questData: value });
    }
  } catch (error) {
    console.error(`Erro ao atualizar a quest por vinculação:`, error);
    throw error;
  }
};

module.exports = {
  getAllQuests,
  getQuestById,
  createQuest,
  updateQuest,
  deleteQuest,
  updateQuestByLink,
};
