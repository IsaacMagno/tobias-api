const { Quests, Champion } = require("../database/models");
const { activities } = require("../functions/generateDailyQuests");
const { calculateLevel } = require("../helpers/calculateLevel");
const { getAllChampions } = require("./championsServices");

const LEVEL_FACTOR = 35;

const createDailyQuests = async (dailyQuestData) => {
  try {
    const champions = await getAllChampions();

    for (const champion of champions) {
      let questLimitDate = new Date();
      questLimitDate.setDate(questLimitDate.getDate() + 1);
      dailyQuestData.champion_id = champion.id;
      dailyQuestData.questLimitDate = questLimitDate;

      createQuest(dailyQuestData);
    }
  } catch (error) {
    console.error(`Erro ao criar quests diárias: ${error}`);
    throw error;
  }
};

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
const updateQuest = async (id, { questData }, championId) => {
  try {
    const quest = await getQuestById(id);

    const questDataUpdate = {
      questActual: quest.questActual + parseFloat(questData),
    };

    if (questDataUpdate.questActual >= quest.questGoal) {
      const champion = await Champion.findOne({ where: { id: championId } });
      const rewards = JSON.parse(quest.questReward);

      updateChampion(championId, champion, rewards);

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
      where: { champion_id: id, link: stats, completed: false },
      raw: true,
    });

    // Itera sobre todas as quests
    for (const quest of quests) {
      // Atualiza cada quest
      await updateQuest(quest.id, { questData: value }, id);
    }
  } catch (error) {
    console.error(`Erro ao atualizar a quest por vinculação:`, error);
    throw error;
  }
};

const updateChampion = async (id, champion, rwd) => {
  const rewards = JSON.parse(rwd);

  const xpBoost = rewards.xp * (champion.xpBoost / 100);
  const updatedXp =
    parseFloat(champion.xp) + parseFloat(rewards.xp) + parseFloat(xpBoost);

  const actualNv = calculateLevel(updatedXp, LEVEL_FACTOR);

  const updatedTobiasCoins = (champion.tobiasCoins || 0) + rewards.tobiasCoins;

  await Champion.update(
    {
      level: actualNv,
      xp: updatedXp,
      tobiasCoins: updatedTobiasCoins,
    },
    { where: { id } }
  );
};

const generateNewDailyQuest = async ({ updateData }) => {
  const champion = await Champion.findByPk(updateData.championId);

  // Determina se a atualização é gratuita
  const today = new Date().setHours(0, 0, 0, 0);
  const lastFreeUpdate = champion.lastFreeQuestUpdate
    ? new Date(champion.lastFreeQuestUpdate).setHours(0, 0, 0, 0)
    : null;
  const isFreeUpdate = !lastFreeUpdate || lastFreeUpdate < today;

  if (
    isFreeUpdate ||
    (updateData.price > 0 && champion.tobiasCoins >= updateData.price)
  ) {
    if (!isFreeUpdate) {
      // Deduz o preço dos TobiasCoins do campeão, se não for uma atualização gratuita
      const updatedTobiasCoins = champion.tobiasCoins - updateData.price;
      await Champion.update(
        { tobiasCoins: updatedTobiasCoins },
        { where: { id: updateData.championId } }
      );
    } else {
      // Atualiza a última data de atualização gratuita
      await Champion.update(
        { lastFreeQuestUpdate: new Date() },
        { where: { id: updateData.championId } }
      );
    }

    // Elimina a quest antiga
    await Quests.destroy({ where: { id: updateData.questId } });

    // Busca as duas outras quests ativas do campeão
    const activeQuests = await Quests.findAll({
      where: { champion_id: updateData.championId, completed: false },
    });

    const activeQuestNames = new Set(activeQuests.map((q) => q.questName));
    activeQuestNames.add(updateData.questName);

    // Embaralha as atividades e seleciona uma nova quest
    const shuffledActivities = activities.sort(() => 0.5 - Math.random());
    const newQuest = shuffledActivities.find(
      (a) => !activeQuestNames.has(a.questName)
    );

    if (newQuest) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      await createQuest({
        champion_id: updateData.championId,
        questName: newQuest.questName,
        questGoal: newQuest.questGoal,
        questActual: 0,
        questLimitDate: tomorrow, // Define a data limite como o dia seguinte
        questReward: JSON.stringify(newQuest.questReward),
        completed: false,
        link: newQuest.link,
      });

      return true;
    } else {
      return "Não foi possível encontrar uma nova quest válida.";
    }
  } else {
    return updateData.price > 0 ? false : "Preço inválido.";
  }
};

// Restante do seu código...

module.exports = {
  createDailyQuests,
  getAllQuests,
  getQuestById,
  createQuest,
  updateQuest,
  deleteQuest,
  updateQuestByLink,
  generateNewDailyQuest,
};
