const { Goal } = require("../database/models");

/**
 * Lê uma meta pelo ID ou todas as metas se nenhum ID for fornecido.
 * @param {number} [id] - O ID da meta.
 * @returns {object|object[]} Retorna a meta se um ID for fornecido, caso contrário retorna todas as metas.
 */
const readGoal = async (id) => {
  return id ? await Goal.findByPk(id) : await Goal.findAll();
};

/**
 * Cria uma nova meta.
 * @param {object} goalData - Os dados da meta.
 * @returns {object} Retorna a meta criada.
 */
const createGoal = async (goalData) => {
  const { goal, type } = goalData;
  const typeLower = type.toLowerCase();

  // Define os valores iniciais para as metas
  let month = 0;
  let week = 0;
  let day = 0;
  let actual = 0;

  // Calcula as metas com base no tipo de meta
  if (typeLower === "anual") {
    month = (goal / 12).toFixed(2);
    week = (goal / 52.1429).toFixed(2);
    day = (goal / 365.25).toFixed(2);
  } else if (typeLower === "mensal") {
    month = goal;
    week = (goal / 4.34524).toFixed(2);
    day = (goal / 30.4167).toFixed(2);
  }

  // Adiciona as metas aos dados da meta
  goalData.month = month;
  goalData.week = week;
  goalData.daily = day;
  goalData.actual = actual;

  // Cria a meta
  return await Goal.create(goalData);
};

/**
 * Atualiza uma meta existente.
 * @param {number} id - O ID da meta.
 * @param {object} goalData - Os dados da meta.
 * @returns {object} Retorna a meta atualizada.
 */
const updateGoal = async (id, goalData) => {
  const goal = await Goal.findByPk(id);
  const actualNumber = parseInt(goalData.actual);

  // Atualiza o valor atual da meta
  goalData.actual = goal.actual + actualNumber;

  // Atualiza a meta
  await Goal.update(goalData, { where: { id } });

  // Retorna a meta atualizada
  return await Goal.findByPk(id);
};

/**
 * Exclui uma meta existente.
 * @param {number} id - O ID da meta.
 * @returns {number} Retorna o número de metas excluídas.
 */
const deleteGoal = async (id) => {
  return await Goal.destroy({ where: { id } });
};

module.exports = {
  readGoal,
  createGoal,
  updateGoal,
  deleteGoal,
};
