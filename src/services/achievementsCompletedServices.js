const { AchievementsCompleted } = require("../database/models");

/**
 * Busca todas as conquistas.
 * @returns {object[]} Retorna uma lista de todas as conquistas.
 * @throws {Error} Lança um erro se houver algum problema ao buscar as conquistas.
 */
const getAllAchievementsCompleted = async () => {
  try {
    const achievements = await AchievementsCompleted.findAll();
    return achievements;
  } catch (error) {
    console.error("Erro ao buscar as conquistas:", error);
    throw error;
  }
};

/**
 * Busca uma conquista concluída pelo ID.
 * @param {number} id - O ID da conquista concluída.
 * @returns {object} Retorna a conquista concluída.
 * @throws {Error} Lança um erro se houver algum problema ao buscar a conquista concluída.
 */
const getAchievementCompleted = async (id) => {
  try {
    const achievementCompleted = await AchievementsCompleted.findByPk(id);
    return achievementCompleted;
  } catch (error) {
    console.error("Erro ao buscar a conquista concluída:", error);
    throw error;
  }
};

/**
 * Cria uma nova conquista concluída.
 * @param {object} data - Os dados da nova conquista concluída.
 * @returns {object} Retorna a nova conquista concluída.
 * @throws {Error} Lança um erro se houver algum problema ao criar a conquista concluída.
 */
const createAchievementCompleted = async (data) => {
  try {
    const achievementCompleted = await AchievementsCompleted.create(data);
    return achievementCompleted;
  } catch (error) {
    console.error("Erro ao criar a conquista concluída:", error);
    throw error;
  }
};

/**
 * Atualiza uma conquista concluída existente.
 * @param {number} id - O ID da conquista concluída.
 * @param {object} data - Os novos dados da conquista concluída.
 * @returns {object} Retorna a conquista concluída atualizada.
 * @throws {Error} Lança um erro se houver algum problema ao atualizar a conquista concluída.
 */
const updateAchievementCompleted = async (id, data) => {
  try {
    const achievementCompleted = await AchievementsCompleted.update(data, {
      where: { id },
    });
    return achievementCompleted;
  } catch (error) {
    console.error("Erro ao atualizar a conquista concluída:", error);
    throw error;
  }
};

/**
 * Deleta uma conquista concluída.
 * @param {number} id - O ID da conquista concluída.
 * @throws {Error} Lança um erro se houver algum problema ao deletar a conquista concluída.
 */
const deleteAchievementCompleted = async (id) => {
  try {
    await AchievementsCompleted.destroy({ where: { id } });
  } catch (error) {
    console.error("Erro ao deletar a conquista concluída:", error);
    throw error;
  }
};

module.exports = {
  getAllAchievementsCompleted,
  getAchievementCompleted,
  createAchievementCompleted,
  updateAchievementCompleted,
  deleteAchievementCompleted,
};
