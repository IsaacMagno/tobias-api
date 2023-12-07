const questsServices = require("../services/questsServices");

const createDailyQuests = async (req, res) => {
  try {
    const createdDailyQuests = await questsServices.createDailyQuests(req.body);

    return res.status(200).json({ createdDailyQuests });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllQuests = async (req, res) => {
  try {
    const quests = await questsServices.getAllQuests();
    return res.status(200).json({ quests });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getQuestById = async (req, res) => {
  try {
    const quest = await questsServices.getQuestById(req.params.id);
    return res.status(200).json({ quest });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createQuest = async (req, res) => {
  try {
    const quest = await questsServices.createQuest(req.body);
    return res.status(201).json({ quest });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateQuest = async (req, res) => {
  try {
    const quest = await questsServices.updateQuest(req.params.id, req.body);
    return res.status(200).json({ quest });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteQuest = async (req, res) => {
  try {
    await questsServices.deleteQuest(req.params.id);
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createDailyQuests,
  getAllQuests,
  getQuestById,
  createQuest,
  updateQuest,
  deleteQuest,
};
