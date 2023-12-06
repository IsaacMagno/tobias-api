const moment = require("moment");
const statsRefactor = require("../helpers/statsRefactor");
const { calculateLevel } = require("../helpers/calculateLevel");

const { Champion } = require("../database/models");
const { createActivities } = require("./activitieServices");
const { createStatistics, findStatisticById } = require("./statisticsServices");
const { createCalendar } = require("./calendarServices");
const { uploadFile } = require("./filesServices");

const TIMEZONE = "America/Sao_Paulo";
const BIO_PATTERN =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, repellat accusantium! Necessitatibus aspernatur voluptas adipisci alias, odio nemo. Aperiam qui rerum consequatur maxime reprehenderit, eos quis eveniet libero? Sint, minima.";

const DAILY_XP_INCREMENT = 25;
const LEVEL_FACTOR = 35;

/**
 * Função para atualizar o daystreak e o daystreakShield de um campeão.
 * Atualiza o daystreak, o daystreakShield e a última data de login de um campeão.
 *
 * @param {number} champion_id - O ID do campeão a ser atualizado.
 * @param {number} newDaystreak - O novo valor do daystreak.
 * @param {number} newDaystreakShield - O novo valor do daystreakShield.
 * @param {Date} today - A data atual.
 */
const updateChampionDaystreakAndShield = async (
  champion_id,
  newDaystreak,
  newDaystreakShield,
  today
) => {
  await Champion.update(
    {
      daystreak: newDaystreak,
      daystreakShield: newDaystreakShield,
      lastDaystreakUpdate: today,
    },
    { where: { id: champion_id } }
  );
};

/**
 * Função para obter um campeão pelo ID.
 * Busca um campeão pelo ID e retorna o campeão encontrado.
 *
 * @param {number} id - O ID do campeão a ser buscado.
 * @returns {Object} O campeão encontrado.
 * @throws {Error} Se houver um erro ao buscar o campeão.
 */
const getChampionById = async (id) => {
  try {
    const champion = await Champion.findOne({ where: { id } });
    return champion;
  } catch (error) {
    console.error(`Erro ao buscar o campeão com id ${id}: ${error}`);
    throw error;
  }
};

/**
 * Função para obter todos os campeões.
 * Busca todos os campeões e retorna os campeões encontrados.
 *
 * @returns {Array} Os campeões encontrados.
 * @throws {Error} Se houver um erro ao buscar os campeões.
 */
const getAllChampions = async () => {
  try {
    const champions = await Champion.findAll({});
    return champions;
  } catch (error) {
    console.error(`Erro ao buscar todos os campeões: ${error}`);
    throw error;
  }
};

/**
 * Função para atualizar a biografia de um campeão.
 * Atualiza a biografia de um campeão e retorna o campeão atualizado.
 *
 * @param {number} id - O ID do campeão a ser atualizado.
 * @param {Object} bio - A nova biografia do campeão.
 * @returns {Object} O campeão atualizado.
 */
const updateChampionBiography = async (id, { bio }) => {
  return await Champion.update({ biography: bio }, { where: { id } }).then(() =>
    getChampionById(id)
  );
};

/**
 * Função para atualizar a experiência de um campeão.
 * Atualiza a experiência e o nível de um campeão e retorna o campeão atualizado.
 *
 * @param {number} id - O ID do campeão a ser atualizado.
 * @param {Object} championExp - A nova experiência do campeão.
 * @returns {Object} O campeão atualizado.
 */
const updateChampionExp = async (id, championExp) => {
  const actualXp = await getChampionById(id);
  const xpBoost = championExp.xp * (actualXp.xpBoost / 100);

  const updatedXp =
    parseFloat(actualXp.xp) + parseFloat(championExp.xp) + parseFloat(xpBoost);

  const actualNv = calculateLevel(updatedXp, LEVEL_FACTOR);

  return await Champion.update(
    { xp: updatedXp, level: actualNv },
    { where: { id } }
  ).then(() => getChampionById(id));
};

/**
 * Função para calcular a diferença de dias entre duas datas.
 *
 * @param {Date} lastUpdate - A data da última atualização.
 * @param {Date} today - A data atual.
 * @returns {number} A diferença de dias entre as duas datas.
 */
const calculateDayDifference = (lastUpdate, today) => {
  return today.diff(lastUpdate, "days");
};

/**
 * Função para calcular o novo daystreak e daystreakShield com base na diferença de dias.
 *
 * @param {number} daystreak - O valor atual do daystreak.
 * @param {number} daystreakShield - O valor atual do daystreakShield.
 * @param {number} diff - A diferença de dias entre a última atualização e a data atual.
 * @returns {Object} O novo daystreak e daystreakShield.
 */
const calculateDaystreaks = (daystreak, daystreakShield, diff) => {
  // Inicializa o novo daystreak e o novo daystreakShield com os valores atuais
  let newDaystreak = daystreak;
  let newDaystreakShield = daystreakShield;

  // Se o daystreakShield atual é 0, então o novo daystreak é definido como 1
  if (daystreakShield === 0) {
    newDaystreak = 1;
  } else {
    // Se a diferença de dias é igual ao daystreakShield atual,
    // então o novo daystreakShield é definido como 1 e o novo daystreak é incrementado em 1
    if (diff === daystreakShield) {
      newDaystreakShield = 1;
      newDaystreak += 1;
    }
    // Se a diferença de dias é maior que o daystreakShield atual,
    // então o novo daystreakShield é definido como 0 e o novo daystreak é definido como 1
    else if (diff > daystreakShield) {
      newDaystreakShield = 0;
      newDaystreak = 1;
    }
    // Se a diferença de dias é menor que o daystreakShield atual,
    // então o novo daystreakShield é decrementado pela diferença de dias e o novo daystreak é incrementado em 1
    else {
      newDaystreakShield -= diff - 1;
      newDaystreak += 1;
    }
  }

  // Retorna o novo daystreak e o novo daystreakShield
  return { newDaystreak, newDaystreakShield };
};

/**
 * Função para atualizar o daystreak de um campeão.
 * Atualiza o daystreak de um campeão e retorna o campeão atualizado.
 *
 * @param {number} id - O ID do campeão a ser atualizado.
 * @returns {Object} O campeão atualizado.
 * @throws {Error} Se houver um erro ao atualizar o daystreak do campeão.
 */
const updateChampionDaystreak = async (id) => {
  try {
    const { wisdom } = await findStatisticById(id);

    const { daystreak, lastDaystreakUpdate, daystreakShield } =
      await getChampionById(id);

    const today = moment().tz(TIMEZONE).startOf("day");
    const lastUpdate = moment(lastDaystreakUpdate).tz(TIMEZONE).startOf("day");

    let diff = calculateDayDifference(lastUpdate, today);
    let newDaystreak;

    if (!lastUpdate.isSame(today, "day")) {
      await updateChampionExp(id, { xp: DAILY_XP_INCREMENT });
    }

    if (diff > 1) {
      const updatedDaystreak = calculateDaystreaks(
        daystreak,
        daystreakShield,
        diff
      );

      newDaystreak = updatedDaystreak.newDaystreak;

      await updateChampionDaystreakAndShield(
        id,
        updatedDaystreak.newDaystreak,
        updatedDaystreak.newDaystreakShield,
        today
      );
    } else if (!lastUpdate.isSame(today, "day")) {
      newDaystreak = daystreak + 1;

      await Champion.update(
        { daystreak: newDaystreak, lastDaystreakUpdate: today },
        { where: { id } }
      );
    }

    await statsRefactor.handleUpdateExpBoost(id, wisdom, newDaystreak);

    return getChampionById(id);
  } catch (error) {
    console.error(`Erro ao atualizar o daystreak do campeão ${id}:`, error);
    throw error;
  }
};

/**
 * Função para criar um campeão.
 * Cria um campeão e retorna o campeão criado.
 *
 * @param {Object} championData - Os dados do campeão a serem criados.
 * @returns {Object} O campeão criado.
 * @throws {Error} Se houver um erro ao criar o campeão.
 */
const createChampion = async (championData, fileData) => {
  try {
    if (!championData || !championData.name || !championData.bornDate) {
      throw new Error("Dados do campeão são inválidos.");
    }

    const newChampionData = {
      name: championData.name,
      bornDate: championData.bornDate,
      title: "Lêmure",
      xp: 0,
      daystreak: 0,
      biography: BIO_PATTERN,
      level: 1,
      xpBoost: 0,
      daystreakShield: 3,
      tobiasCoins: 100,
      achievementPoints: 0,
    };

    const champion = await Champion.create(newChampionData);
    const rawChampion = champion.get({ plain: true });

    await createActivities(rawChampion.id);
    await createStatistics(rawChampion.id);
    await createCalendar(rawChampion.id);
    await uploadFile(fileData, rawChampion.id);

    return rawChampion;
  } catch (error) {
    console.error("Erro ao criar o campeão:", error);

    throw new Error("Erro ao criar o campeão: " + error.message);
  }
};

module.exports = {
  getChampionById,
  getAllChampions,
  createChampion,
  updateChampionBiography,
  updateChampionExp,
  updateChampionDaystreak,
  updateChampionDaystreakAndShield,
};
