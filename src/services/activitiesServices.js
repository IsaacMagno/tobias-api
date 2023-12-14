const { Activitie, ActivitiesIntensity } = require("../database/models");
const {
  updateChampionExp,
  updateChampionDaystreak,
} = require("./championsServices");

const expBase = {
  kmRun: 150,
  jumpRope: 0.5,
  kmBike: 50,
  upperLimb: 2,
  abs: 2,
  lowerLimb: 3.5,
  meals: 25,
  drinks: 5,
  sleep: 1.5,
  study: 200,
  meditation: 1000,
  reading: 300,
};

/**
 * Atualiza a experiência e a sequência diária de um campeão.
 * @param {number} id - O ID do campeão.
 * @param {string} stats - A estatística a ser atualizada.
 * @param {number} value - O valor a ser adicionado à estatística.
 * @throws {Error} Lança um erro se houver algum problema ao atualizar a experiência ou a sequência diária do campeão.
 */
const handleUpdateExpAndDaystreak = async (id, stats, value) => {
  try {
    // Calcula a experiência do campeão com base na estatística e no valor
    const championExp = {};
    championExp.xp = expBase[stats] * value;
    await updateChampionExp(id, championExp);
    await updateChampionDaystreak(id);
  } catch (error) {
    console.error(
      `Erro ao atualizar a experiência ou a sequência diária do campeão:`,
      error
    );
    throw error;
  }
};

/**
 * Atualiza as atividades de um campeão.
 * @param {number} champion_id - O ID do campeão.
 * @param {string} stats - A estatística a ser atualizada.
 * @param {number} value - O valor a ser adicionado à estatística.
 * @returns {object} Retorna as estatísticas atualizadas do campeão.
 */
const updateActivities = async (champion_id, stats, value) => {
  try {
    // Buscar as estatísticas antigas
    const oldActivities = await findActivityById(champion_id);

    // Verificar se as estatísticas antigas existem
    if (!oldActivities) {
      throw new Error("No old stats found for the given champion_id");
    }

    const { [stats]: oldActivitie } = oldActivities;

    // Atualizar as estatísticas
    await Activitie.update(
      { [stats]: parseFloat(value) + parseFloat(oldActivitie) },
      { where: { champion_id } }
    );

    await handleUpdateExpAndDaystreak(champion_id, stats, value);

    // Buscar as estatísticas atualizadas
    const statsUpdated = await findActivityById(champion_id);

    return statsUpdated;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const intensityMultipliers = {
  alta: (value) => value * 2,
  media: (value) => value * 1.5,
  baixa: (value) => value,
};

const handleCalculateActivitie = (
  activitieIntensity = "baixa",
  activitieValue
) => {
  const calculate = intensityMultipliers[activitieIntensity];
  if (!calculate) {
    console.log("Intensidade não reconhecida");
    return;
  }
  return calculate(activitieValue);
};

const updateActivitiesIntensity = async (
  champion_id,
  stats,
  value,
  intensity
) => {
  try {
    const old = await ActivitiesIntensity.findOne({
      where: { champion_id },
      raw: true,
    });

    if (!old) {
      throw new Error("No old stats found for the given champion_id");
    }

    const { [stats]: oldActivitie } = old;

    const updatedValue = handleCalculateActivitie(intensity, value);

    // Atualizar as estatísticas
    await ActivitiesIntensity.update(
      { [stats]: parseFloat(updatedValue) + parseFloat(oldActivitie) },
      { where: { champion_id } }
    );

    const updated = await ActivitiesIntensity.findOne({
      where: { champion_id },
      raw: true,
    });

    return updated;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Encontra uma atividade pelo ID do campeão.
 * @param {number} id - O ID do campeão.
 * @returns {object} Retorna a atividade se encontrada, null caso contrário.
 */
const findActivityById = async (id) => {
  // Busca a atividade pelo ID do campeão
  const activity = await Activitie.findOne({
    where: { champion_id: id },
    raw: true,
  });
  return activity;
};

module.exports = {
  updateActivities,
  updateActivitiesIntensity,
};
