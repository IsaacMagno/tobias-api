const activitiesService = require("../services/activitieServices");
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
    const { [stats[0]]: value } = req.body;
    const { activitieIntensity } = req.body;

    // Atualiza as atividades
    const updateChampActivities = await activitiesServices.updateActivities(
      id,
      stats[0],
      value
    );

    // Atualiza as atividades aplicando intensidade
    const updateChampActivitiesIntensity =
      await activitiesServices.updateActivitiesIntensity(
        id,
        stats[0],
        value,
        activitieIntensity
      );

    // Atualiza as metas
    await goalServices.updateGoalByLink(id, stats[0], value);

    // Atualiza as quests
    await questsServices.updateQuestByLink(id, stats[0], value);

    // Atualiza quests mensais
    await monthlyChallengeServices.updateMonthlyChallengeByLink(
      id,
      stats[0],
      value
    );

    // Atualiza as conquistas
    const achievementCompleted =
      await achievementServices.updateAchievementByLink(id, stats[0]);

    // Atualiza as statistics e retorna os dados do mesmo atualizado
    const championUpdated = await statisticsServices.updateStatistic(
      updateChampActivitiesIntensity,
      stats[0],
      value
    );

    return res.status(200).json({ championUpdated, achievementCompleted });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createActivities = async (req, res) => {
  try {
    const { id } = req.params;

    const createdActivity = await activitiesService.createActivities(id);

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

const getDailyActivitiesById = async (req, res) => {
  try {
    const { id } = req.params;

    const activities = await activitiesServices.getDailyActivitiesById(id);

    return res.status(200).json({ activities });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createActivities,
  updateActivities,
  getActivities,
  getDailyActivitiesById,
};
