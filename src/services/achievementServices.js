const { Achievement } = require("../database/models");

/**
 * Busca uma conquista pelo ID.
 * @param {number} id - O ID da conquista.
 * @returns {object} Retorna a conquista encontrada.
 * @throws {Error} Lança um erro se houver algum problema ao buscar a conquista.
 */
const getAchievementById = async (id) => {
  try {
    const achievement = await Achievement.findByPk(id);
    return achievement;
  } catch (error) {
    console.error(`Erro ao buscar a conquista com o id:${id}:`, error);
    throw error;
  }
};

/**
 * Busca todas as conquistas.
 * @returns {object[]} Retorna uma lista de todas as conquistas.
 * @throws {Error} Lança um erro se houver algum problema ao buscar as conquistas.
 */
const getAllAchievements = async () => {
  try {
    const achievements = await Achievement.findAll();
    return achievements;
  } catch (error) {
    console.error("Erro ao buscar as conquistas:", error);
    throw error;
  }
};

/**
 * Cria uma nova conquista.
 * @param {object} newAchievement - A nova conquista a ser criada.
 * @returns {object} Retorna a conquista criada.
 * @throws {Error} Lança um erro se houver algum problema ao criar a conquista.
 */
const createAchievement = async (newAchievement) => {
  try {
    const achievement = await Achievement.create(newAchievement);
    return achievement;
  } catch (error) {
    console.error("Erro ao criar a conquista:", error);
    throw error;
  }
};

/**
 * Atualiza uma conquista existente.
 * @param {number} id - O ID da conquista a ser atualizada.
 * @param {object} updatedAchievement - A conquista atualizada.
 * @returns {object} Retorna a conquista atualizada.
 * @throws {Error} Lança um erro se houver algum problema ao atualizar a conquista.
 */
const updateAchievement = async (id, updatedAchievement) => {
  try {
    await Achievement.update(updatedAchievement, { where: { id } });
    const achievement = await getAchievementById(id);
    return achievement;
  } catch (error) {
    console.error(`Erro ao atualizar a conquista com o id:${id}:`, error);
    throw error;
  }
};

/**
 * Exclui uma conquista existente.
 * @param {number} id - O ID da conquista a ser excluída.
 * @throws {Error} Lança um erro se houver algum problema ao excluir a conquista.
 */
const deleteAchievement = async (id) => {
  try {
    await Achievement.destroy({ where: { id } });
  } catch (error) {
    console.error(`Erro ao excluir a conquista com o id:${id}:`, error);
    throw error;
  }
};

module.exports = {
  getAchievementById,
  getAllAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
};
