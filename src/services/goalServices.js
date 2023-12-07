const { Goal } = require("../database/models");

// Função para calcular as metas
/**
 * Calcula as metas com base no tipo de meta.
 * @param {number} goal - A meta.
 * @param {string} type - O tipo da meta.
 * @returns {object} Retorna as metas calculadas.
 */
const calculateGoals = (goal, type) => {
  let month = 0;
  let week = 0;
  let day = 0;

  if (type === "anual") {
    month = (goal / 12).toFixed(2);
    week = (goal / 52.1429).toFixed(2);
    day = (goal / 365.25).toFixed(2);
  } else if (type === "mensal") {
    month = goal;
    week = (goal / 4.34524).toFixed(2);
    day = (goal / 30.4167).toFixed(2);
  }

  return { month, week, day };
};

// Função para ler uma meta
/**
 * Lê uma meta pelo ID ou todas as metas se nenhum ID for fornecido.
 * @param {number} [id] - O ID da meta.
 * @returns {object|object[]} Retorna a meta se um ID for fornecido, caso contrário retorna todas as metas.
 * @throws {Error} Lança um erro se ocorrer um problema ao ler a meta.
 */
const readGoal = async (id) => {
  try {
    return id ? await Goal.findByPk(id) : await Goal.findAll();
  } catch (error) {
    console.error(`Erro ao ler a meta ${id}:`, error);
    throw error;
  }
};

// Função para criar uma meta
/**
 * Cria uma nova meta.
 * @param {object} goalData - Os dados da meta.
 * @returns {object} Retorna a meta criada.
 * @throws {Error} Lança um erro se ocorrer um problema ao criar a meta.
 */
const createGoal = async ({ goalData }) => {
  try {
    const { goal, type } = goalData;
    const typeLower = type.toLowerCase();

    const { month, week, day } = calculateGoals(goal, typeLower);

    goalData.month = month;
    goalData.week = week;
    goalData.daily = day;
    goalData.actual = 0;

    return await Goal.create(goalData);
  } catch (error) {
    console.error(`Erro ao criar a meta:`, error);
    throw error;
  }
};

// Função para atualizar uma meta
/**
 * Atualiza uma meta existente.
 * @param {number} id - O ID da meta.
 * @param {object} goalData - Os dados da meta.
 * @returns {object} Retorna a meta atualizada.
 * @throws {Error} Lança um erro se ocorrer um problema ao atualizar a meta.
 */
const updateGoal = async (id, { goalData }) => {
  try {
    const goal = await readGoal(id);

    const goalDataUpdate = { actual: goal.actual + parseInt(goalData) };

    if (goalDataUpdate.actual >= goal.goal) {
      goalDataUpdate.completed = true;
      goalDataUpdate.completedDate = new Date();
    }

    await Goal.update(goalDataUpdate, { where: { id } });

    return await readGoal(id);
  } catch (error) {
    console.error(`Erro ao atualizar a meta ${id}:`, error);
    throw error;
  }
};

// Função para excluir uma meta
/**
 * Exclui uma meta existente.
 * @param {number} id - O ID da meta.
 * @returns {number} Retorna o número de metas excluídas.
 * @throws {Error} Lança um erro se ocorrer um problema ao excluir a meta.
 */
const deleteGoal = async (id) => {
  try {
    return await Goal.destroy({ where: { id } });
  } catch (error) {
    console.error(`Erro ao excluir a meta ${id}:`, error);
    throw error;
  }
};

// Função para atualizar uma meta por vinculação
/**
 * Atualiza uma meta por vinculação.
 * @param {number} id - O ID do campeão.
 * @param {array} stats - As estatísticas.
 * @param {number} value - O valor.
 * @throws {Error} Lança um erro se ocorrer um problema ao atualizar a meta.
 */
const updateGoalByLink = async (id, [stats], value) => {
  try {
    // Busca todas as metas que têm o link correspondente
    const goals = await Goal.findAll({
      where: { champion_id: id, link: stats },
      raw: true,
    });

    // Itera sobre todas as metas
    for (const goal of goals) {
      // Atualiza cada meta
      await updateGoal(goal.id, { goalData: value });
    }
  } catch (error) {
    console.error(`Erro ao atualizar a meta por vinculação:`, error);
    throw error;
  }
};

module.exports = {
  readGoal,
  createGoal,
  updateGoal,
  deleteGoal,
  updateGoalByLink,
};
