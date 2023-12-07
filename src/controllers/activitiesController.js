const activitiesServices = require("../services/activitiesServices");
const statisticsServices = require("../services/statisticsServices");
const goalServices = require("../services/goalServices");
const questsServices = require("../services/questsServices");
const achievementServices = require("../services/achievementServices");
const monthlyChallengeServices = require("../services/monthlyChallengeServices");

const updateActivities = async (req, res) => {
  try {
    const { id } = req.params;
    const stats = Object.keys(req.body);
    const { [stats]: value } = req.body;

    const updateChampActivities = await activitiesServices.updateActivities(
      id,
      stats,
      value
    );

    // Atualiza as metas do campeão
    await goalServices.updateGoalByLink(id, stats, value);

    // Atualiza as quests do campeão
    await questsServices.updateQuestByLink(id, stats, value);

    await monthlyChallengeServices.updateMonthlyChallengeByLink(
      id,
      stats,
      value
    );

    // Atualiza as conquistas do campeão
    await achievementServices.updateAchievementByLink(id, stats);

    // Atualiza as statistics do campeão e retorna os dados do mesmo atualizado
    const championUpdated = await statisticsServices.updateStatistic(
      updateChampActivities
    );

    return res.status(200).json({ championUpdated });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createActivities = async (req, res) => {
  try {
    const { id } = req.params;

    const createdActivity = await activitiesServices.createActivities(id);

    return res.status(201).json({ createdActivity });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getActivities = async (req, res) => {
  try {
    const { id } = req.params;

    const activities = await activitiesServices.findActivityById(id);

    return res.status(200).json({ activities });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createActivities,
  updateActivities,
  getActivities,
};
