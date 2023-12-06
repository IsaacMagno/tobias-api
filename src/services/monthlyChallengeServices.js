// Services
const { MonthlyChallenge } = require("../database/models");

const getAllMonthlyChallenges = async () => {
  try {
    const challenges = await MonthlyChallenge.findAll();
    return challenges;
  } catch (error) {
    console.error(`Erro ao buscar todos os desafios mensais: ${error}`);
    throw error;
  }
};

const getMonthlyChallengeById = async (id) => {
  try {
    const challenge = await MonthlyChallenge.findByPk(id);
    return challenge;
  } catch (error) {
    console.error(`Erro ao buscar o desafio mensal: ${error}`);
    throw error;
  }
};

const createMonthlyChallenge = async (newChallenge) => {
  try {
    const challenge = await MonthlyChallenge.create(newChallenge);
    return challenge;
  } catch (error) {
    console.error(`Erro ao criar o desafio mensal: ${error}`);
    throw error;
  }
};

const updateMonthlyChallenge = async (id, updatedChallenge) => {
  try {
    await MonthlyChallenge.update(updatedChallenge, { where: { id } });
    return await getMonthlyChallengeById(id);
  } catch (error) {
    console.error(`Erro ao atualizar o desafio mensal: ${error}`);
    throw error;
  }
};

const deleteMonthlyChallenge = async (id) => {
  try {
    await MonthlyChallenge.destroy({ where: { id } });
  } catch (error) {
    console.error(`Erro ao deletar o desafio mensal: ${error}`);
    throw error;
  }
};

module.exports = {
  getAllMonthlyChallenges,
  getMonthlyChallengeById,
  createMonthlyChallenge,
  updateMonthlyChallenge,
  deleteMonthlyChallenge,
};
