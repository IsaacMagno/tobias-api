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
const { getAllStatistics, findStatisticById } = require("./statisticsServices");

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
 * Verifica se uma conquista já foi completada.
 * @param {Array} achievementsCompleted - A lista de conquistas completadas.
 * @param {number} achievementId - O ID da conquista.
 * @returns {boolean} Verdadeiro se a conquista já foi completada, falso caso contrário.
 */
const isAchievementCompleted = (achievementsCompleted, achievementId) => {
  return achievementsCompleted.some(
    (achiev) => achiev.achievement_id === achievementId
  );
};

/**
 * Cria uma conquista completada.
 * @param {number} id - O ID do campeão.
 * @param {number} achievementId - O ID da conquista.
 * @throws {Error} Lança um erro se houver algum problema ao criar a conquista completada.
 */
const completeAchievement = async (id, achievementId) => {
  await createAchievementCompleted({
    champion_id: id,
    achievement_id: achievementId,
    date: Date.now(),
  });
};

/**
 * Atualiza o campeão.
 * @param {number} id - O ID do campeão.
 * @param {Object} champion - O objeto do campeão.
 * @param {Object} rewards - As recompensas.
 * @throws {Error} Lança um erro se houver algum problema ao atualizar o campeão.
 */
const updateChampion = async (id, champion, rewards) => {
  const xpBoost = rewards.xp * (champion.xpBoost / 100);
  const updatedXp =
    parseFloat(champion.xp) + parseFloat(rewards.xp) + parseFloat(xpBoost);

  const actualNv = calculateLevel(updatedXp, LEVEL_FACTOR);

  const updatedTobiasCoins = (champion.tobiasCoins || 0) + rewards.tobiasCoins;
  const updatedAchievementPoints =
    (champion.achievementPoints || 0) + rewards.achievementPoints;

  await Champion.update(
    {
      level: actualNv,
      xp: updatedXp,
      tobiasCoins: updatedTobiasCoins,
      achievementPoints: updatedAchievementPoints,
    },
    { where: { id } }
  );
};

/**
 * Atualiza uma conquista com base no link.
 * @param {number} id - O ID do campeão.
 * @param {string} stats - As estatísticas.
 * @returns {boolean} Verdadeiro se uma nova conquista foi completada, falso caso contrário.
 * @throws {Error} Lança um erro se houver algum problema ao atualizar a conquista.
 */
const updateAchievementByLink = async (id, stats) => {
  try {
    let newAchievementCompleted = false;

    const activities = await Activitie.findOne({
      where: { champion_id: id },
      raw: true,
    });

    const statValue = activities[stats];
    const achievements = await getAchievementByLink([stats]);
    const achievementsCompleted = await AchievementsCompleted.findAll({
      where: { champion_id: id },
    });

    for (const achievement of achievements) {
      if (statValue >= achievement.goal) {
        if (!isAchievementCompleted(achievementsCompleted, achievement.id)) {
          await completeAchievement(id, achievement.id);

          const champion = await Champion.findOne({ where: { id } });
          const rewards = JSON.parse(achievement.rewards);
          // const rewards = achievement.rewards;

          await updateChampion(id, champion, rewards);

          newAchievementCompleted = true;
        }
      }
    }

    const wisdomAchievements = await getAchievementByLink("wisdom");
    const statistics = await findStatisticById(id);

    let total = Object.keys(statistics)
      .filter((key) => key !== "id" && key !== "champion_id")
      .reduce((sum, key) => sum + statistics[key], 0);

    for (const wisdomAchiev of wisdomAchievements) {
      if (total >= wisdomAchiev.goal) {
        if (!isAchievementCompleted(achievementsCompleted, wisdomAchiev.id)) {
          await completeAchievement(id, wisdomAchiev.id);

          const champion = await Champion.findOne({ where: { id } });
          const rewards = JSON.parse(wisdomAchiev.rewards);
          // const rewards = wisdomAchiev.rewards;

          await updateChampion(id, champion, rewards);

          newAchievementCompleted = true;
        }
      }
    }

    return newAchievementCompleted;
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
