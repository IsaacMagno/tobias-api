const {
  Achievement,
  Activitie,
  AchievementsCompleted,
  Champion,
} = require("../database/models");
const { calculateLevel } = require("../helpers/calculateLevel");
const {
  createAchievementCompleted,
} = require("./achievementsCompletedServices");

const LEVEL_FACTOR = 35;

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
    const achievements = await Achievement.findAll({ raw: true });
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

const getAchievementByLink = async (stats) => {
  try {
    const achievements = await Achievement.findAll({
      where: { link: [stats] },
    });
    return achievements;
  } catch (error) {
    console.error("Erro ao buscar as conquistas:", error);
    throw error;
  }
};

/**
 * Atualiza uma conquista com base no link.
 * @param {number} id - O ID do campeão.
 * @param {string} stats - As estatísticas.
 * @throws {Error} Lança um erro se houver algum problema ao atualizar a conquista.
 */
const updateAchievementByLink = async (id, stats) => {
  try {
    // Busca a atividade do campeão
    const activities = await Activitie.findOne({
      where: { champion_id: id },
      raw: true,
    });

    // Obtém o valor da estatística
    const statValue = activities[stats];

    // Busca todas as conquistas que têm o link correspondente
    const achievements = await getAchievementByLink([stats]);

    // Busca todas as conquistas completadas do campeão
    const achievementsCompleted = await AchievementsCompleted.findAll({
      where: { champion_id: id },
    });

    // Itera sobre todas as conquistas
    for (const achievement of achievements) {
      // Verifica se o valor da estatística é maior ou igual à meta da conquista
      if (statValue >= achievement.goal) {
        // Verifica se a conquista já foi completada
        const alreadyCompleted = achievementsCompleted.some(
          (achiev) => achiev.achievement_id === achievement.id
        );

        // Se a conquista ainda não foi completada, cria uma nova conquista completada
        if (!alreadyCompleted) {
          await createAchievementCompleted({
            champion_id: id,
            achievement_id: achievement.id,
            date: Date.now(),
          });

          // Busca o campeão
          const champion = await Champion.findOne({ where: { id } });
          const rewards = JSON.parse(achievement.rewards);

          // Adiciona os novos valores aos valores existentes
          const xpBoost = rewards.xp * (champion.xpBoost / 100);
          const updatedXp =
            parseFloat(champion.xp) +
            parseFloat(rewards.xp) +
            parseFloat(xpBoost);

          const actualNv = calculateLevel(updatedXp, LEVEL_FACTOR);

          const updatedTobiasCoins =
            (champion.tobiasCoins || 0) + rewards.tobiasCoins;
          const updatedAchievementPoints =
            (champion.achievementPoints || 0) + rewards.achievementPoints;

          // Atualiza o campeão
          await Champion.update(
            {
              level: actualNv,
              xp: updatedXp,
              tobiasCoins: updatedTobiasCoins,
              achievementPoints: updatedAchievementPoints,
            },
            { where: { id } }
          );
        }
      }
    }
  } catch (error) {
    console.error(`Erro ao atualizar a conquista por link:`, error);
    throw error;
  }
};

module.exports = {
  getAchievementById,
  getAllAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
  updateAchievementByLink,
};
