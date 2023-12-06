const monthlyChallengeServices = require("../services/monthlyChallengeServices");

const getAllMonthlyChallenges = async (req, res) => {
  try {
    const challenges = await monthlyChallengeServices.getAllMonthlyChallenges();
    return res.status(200).json({ challenges });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getMonthlyChallengeById = async (req, res) => {
  try {
    const challenge = await monthlyChallengeServices.getMonthlyChallengeById(
      req.params.id
    );
    return res.status(200).json({ challenge });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createMonthlyChallenge = async (req, res) => {
  try {
    const challenge = await monthlyChallengeServices.createMonthlyChallenge(
      req.body
    );
    return res.status(201).json({ challenge });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateMonthlyChallenge = async (req, res) => {
  try {
    const challenge = await monthlyChallengeServices.updateMonthlyChallenge(
      req.params.id,
      req.body
    );
    return res.status(200).json({ challenge });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteMonthlyChallenge = async (req, res) => {
  try {
    await monthlyChallengeServices.deleteMonthlyChallenge(req.params.id);
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllMonthlyChallenges,
  getMonthlyChallengeById,
  createMonthlyChallenge,
  updateMonthlyChallenge,
  deleteMonthlyChallenge,
};
