const { Champion } = require("../database/models");

/**
 * Atualiza o título de um campeão.
 * @param {number} id - O ID do campeão.
 * @param {number} total - O total de pontos de estatística do campeão.
 * @param {string} maxKey - A chave da estatística com o valor máximo.
 * @param {number} maxValue - O valor máximo entre as estatísticas.
 */
const handleGiveTitle = async (id, total, maxKey, maxValue) => {
  // Mapeia as chaves das estatísticas para os títulos correspondentes
  const titles = {
    vitality: [
      "Fitness",
      "Energético",
      "Vigoroso",
      "Resiliente",
      "Robusto",
      "Vital",
    ],
    inteligence: [
      "Sagaz",
      "Erudito",
      "Perspicaz",
      "Astuto",
      "Sábio",
      "Iluminado",
    ],
    agility: ["Velocista", "Ágil", "Rápido", "Ligeiro", "Flexível", "Destro"],
    strength: [
      "Musculoso",
      "Poderoso",
      "Forte",
      "Robusto",
      "Vigoroso",
      "Potente",
    ],
  };

  // Calcula o índice do título com base no valor máximo da estatística
  let titleIndex = Math.floor(maxValue / 100);
  titleIndex =
    titleIndex >= titles[maxKey].length
      ? titles[maxKey].length - 1
      : titleIndex;

  // Obtém o subtítulo correspondente
  let sub_title = titles[maxKey][titleIndex];

  // Determina o título com base no total de pontos de estatística
  let title;
  if (total <= 499) {
    title = `Lêmure ${sub_title}`;
  } else if (total <= 999) {
    title = `Gibão ${sub_title}`;
  } else if (total <= 1999) {
    title = `Orangotango ${sub_title}`;
  } else if (total <= 4999) {
    title = `Gorila ${sub_title}`;
  } else if (total <= 9999) {
    title = `Chimpanzé ${sub_title}`;
  } else {
    title = `Humano ${sub_title}`;
  }

  try {
    // Atualiza o título do campeão
    await Champion.update({ title }, { where: { id } });
  } catch (error) {
    console.error(`Erro ao atualizar o título do campeão ${id}:`, error);
    throw error;
  }
};

/**
 * Atualiza o xpBoost de um campeão.
 * @param {number} id - O ID do campeão.
 * @param {number} wis - A sabedoria do campeão.
 * @param {number} daystreak - A sequência de dias do campeão.
 */
const handleUpdateExpBoost = async (id, wis, daystreak) => {
  try {
    const user = await Champion.findOne({ where: { id } });
    let actualDaystreak = daystreak || user.daystreak;
    let xpBoostWis = wis / 15;

    // Determina o xpBoost com base na sequência de dias
    let xpBoost = 0;
    if (actualDaystreak >= 7) {
      xpBoost = Math.floor(actualDaystreak / 7) * 3;
      xpBoost = xpBoost > 15 ? 15 : xpBoost;
    }

    xpBoost += xpBoostWis;

    // Atualiza o xpBoost do campeão
    await Champion.update({ xpBoost }, { where: { id } });
  } catch (error) {
    console.error(`Erro ao atualizar o xpBoost do campeão ${id}:`, error);
    throw error;
  }
};

/**
 * Calcula as estatísticas de um campeão.
 * @param {object} agi - A agilidade do campeão.
 * @param {object} str - A força do campeão.
 * @param {object} int - A inteligência do campeão.
 * @param {object} vit - A vitalidade do campeão.
 * @param {number} id - O ID do campeão.
 * @returns {object} Retorna um objeto com todas as estatísticas calculadas.
 */
const statsCalculate = async (agi, str, int, vit, id) => {
  try {
    // Desestrutura os novos valores das estatísticas
    const { upper, absNew, lower } = str.newValue;
    const { run, rope, bike } = agi.newValue;
    const { stu, medit, read } = int.newValue;
    const { meal, drink, sleep } = vit.newValue;

    // Calcula as estatísticas
    const stats = {
      strength: Math.floor(upper + absNew + lower),
      agility: Math.floor(run + rope + bike),
      inteligence: Math.floor(stu + medit + read),
      vitality: Math.floor(meal + drink + sleep),
    };

    // Calcula o total de pontos de estatística
    let total = Object.values(stats).reduce((prev, curr) => prev + curr, 0);

    // Calcula a atualização da sabedoria
    const wisUpdate = Math.floor(total / 15);

    // Atualiza o xpBoost do campeão
    await handleUpdateExpBoost(id, wisUpdate);

    // Adiciona a sabedoria às estatísticas
    stats.wisdom = wisUpdate;

    // Determina a estatística com o valor máximo
    const maxKey = Object.entries(stats).reduce((acc, curr) =>
      acc[1] > curr[1] ? acc : curr
    )[0];

    // Obtém o valor máximo entre as estatísticas
    const maxKeyValue = stats[maxKey];

    // Atualiza o título do campeão
    await handleGiveTitle(id, total, maxKey, maxKeyValue);

    return stats;
  } catch (error) {
    console.error(`Erro ao calcular estatísticas para o campeão ${id}:`, error);
    throw error;
  }
};

/**
 * Cria um objeto de estatística.
 * @param {string} name - O nome da estatística.
 * @param {object} newValue - Os novos valores para a estatística.
 * @param {number} oldValue - O valor antigo da estatística.
 * @returns {object} Retorna um objeto de estatística.
 */
const createStatObject = (name, newValue, oldValue) => ({
  name,
  newValue,
  oldValue,
});

/**
 * Refatora as estatísticas de um campeão.
 * @param {object[]} activities - As atividades do campeão.
 * @param {object[]} actualStats - As estatísticas atuais do campeão.
 * @param {number} id - O ID do campeão.
 * @returns {object} Retorna um objeto com todas as estatísticas refatoradas.
 */
const statsRefactor = async (activities, actualStats, id) => {
  try {
    // Desestruturar as atividades e estatísticas
    const {
      kmRun,
      jumpRope,
      kmBike,
      upperLimb,
      abs,
      lowerLimb,
      meals,
      drinks,
      sleep,
      study,
      meditation,
      reading,
    } = activities;

    const { strength, agility, inteligence, vitality } = actualStats[0];

    // Criar objetos de estatística
    const agi = createStatObject(
      "agility",
      {
        run: kmRun / 5,
        rope: jumpRope / 1800,
        bike: kmBike / 20,
      },
      agility
    );

    const str = createStatObject(
      "strength",
      {
        upper: upperLimb / 300,
        absNew: abs / 500,
        lower: lowerLimb / 300,
      },
      strength
    );

    const int = createStatObject(
      "inteligence",
      {
        stu: study / 8,
        medit: meditation / 2,
        read: reading / 3,
      },
      inteligence
    );

    const vit = createStatObject(
      "vitality",
      {
        meal: meals / 8,
        drink: drinks / 10,
        sleep: sleep / 240,
      },
      vitality
    );

    // Calcular todas as estatísticas
    const allStats = await statsCalculate(agi, str, int, vit, id);

    return allStats;
  } catch (error) {
    console.error(
      `Erro ao refatorar estatísticas para o campeão ${id}:`,
      error
    );
    throw error;
  }
};

module.exports = {
  statsRefactor,
  handleUpdateExpBoost,
};
