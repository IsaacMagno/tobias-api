const achivementsCompletedServices = require("../services/achievementsCompletedServices");

const getAllAchievementsCompleted = async (req, res) => {
  try {
    const achievementsCompleted =
      await achivementsCompletedServices.getAllAchievementsCompleted();
    return res.status(200).json({ achievementsCompleted });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAchievementCompleted = async (req, res) => {
  const { id } = req.params;
  try {
    const achievementCompleted =
      await achivementsCompletedServices.getAchievementCompleted(id);
    return res.status(200).json({ achievementCompleted });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createAchievementCompleted = async (req, res) => {
  try {
    const achievementCompleted =
      await achivementsCompletedServices.createAchievementCompleted(req.body);
    return res.status(201).json({ achievementCompleted });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateAchievementCompleted = async (req, res) => {
  const { id } = req.params;
  try {
    const achievementCompleted =
      await achivementsCompletedServices.updateAchievementCompleted(
        id,
        req.body
      );
    return res.status(200).json({ achievementCompleted });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteAchievementCompleted = async (req, res) => {
  const { id } = req.params;
  try {
    await achivementsCompletedServices.deleteAchievementCompleted(id);
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllAchievementsCompleted,
  getAchievementCompleted,
  createAchievementCompleted,
  updateAchievementCompleted,
  deleteAchievementCompleted,
};
