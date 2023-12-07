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

const updateMonthlyChallenge = async (id, { challengeData }) => {
  try {
    const challenge = await getMonthlyChallengeById(id);

    const challengeDataUpdate = {
      questActual: challenge.questActual + parseInt(challengeData),
    };

    if (challengeDataUpdate.questActual >= challenge.questGoal) {
      questDataUpdate.completed = true;
    }

    await MonthlyChallenge.update(challengeDataUpdate, { where: { id } });

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

/**
 * Atualiza uma challenge com base no link.
 * @param {number} id - O ID do campeão.
 * @param {string} stats - As estatísticas.
 * @param {number} value - O valor a ser atualizado.
 * @throws {Error} Lança um erro se houver algum problema ao atualizar a quest.
 */
const updateMonthlyChallengeByLink = async (id, stats, value) => {
  try {
    // Busca todas as challenge que têm o link correspondente
    const challenge = await MonthlyChallenge.findOne({
      where: { champion_id: id, link: [stats] },
      raw: true,
    });

    // Itera sobre todas as challenge
    if (challenge) {
      // Atualiza cada challenge
      await updateMonthlyChallenge(challenge.id, { challengeData: value });
    }
  } catch (error) {
    console.error(`Erro ao atualizar a quest por vinculação:`, error);
    throw error;
  }
};

module.exports = {
  getAllMonthlyChallenges,
  getMonthlyChallengeById,
  createMonthlyChallenge,
  updateMonthlyChallenge,
  deleteMonthlyChallenge,
  updateMonthlyChallengeByLink,
};
