const achievementServices = require("../services/achievementServices");

const getAchievementById = async (req, res) => {
  try {
    const { id } = req.params;
    const achievement = await achievementServices.getAchievementById(id);
    return res.status(200).json({ achievement });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllAchievements = async (req, res) => {
  try {
    const achievements = await achievementServices.getAllAchievements();
    return res.status(200).json({ achievements });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createAchievement = async (req, res) => {
  try {
    const newAchievement = req.body;
    const achievement = await achievementServices.createAchievement(
      newAchievement
    );
    return res.status(201).json({ achievement });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAchievement = req.body;
    const achievement = await achievementServices.updateAchievement(
      id,
      updatedAchievement
    );
    return res.status(200).json({ achievement });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    await achievementServices.deleteAchievement(id);
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAchievementById,
  getAllAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
};
