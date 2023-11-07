// Importando as bibliotecas necessárias
const bcrypt = require("bcrypt");
const moment = require("moment");
const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET;

// Importando os modelos do banco de dados
const { Authentication, Token } = require("../database/models");

// Importando os serviços
const {
  updateChampionDaystreakAndShield,
  getChampionById,
  createChampion,
} = require("../services/championsServices");

// Configurações
const TIMEZONE = process.env.TIMEZONE || "America/Sao_Paulo";

/**
 * Verifica se a senha fornecida é válida para o campeão.
 * @param {string} password - A senha fornecida.
 * @param {object} champion - O campeão.
 * @returns {boolean} Retorna verdadeiro se a senha for válida, falso caso contrário.
 */
const isValidPassword = (password, champion) => {
  return bcrypt.compare(password, champion.password);
};

/**
 * Encontra um campeão pelo nome de usuário.
 * @param {string} username - O nome de usuário do campeão.
 * @returns {object} Retorna o campeão se encontrado, null caso contrário.
 */
const findChampionByUsername = async (username) => {
  return await Authentication.findOne({ where: { username }, raw: true });
};

/**
 * Atualiza o daystreak e o daystreakShield com base na diferença de dias.
 * @param {number} daystreak - O daystreak atual do campeão.
 * @param {number} daystreakShield - O daystreakShield atual do campeão.
 * @param {number} diff - A diferença de dias desde o último login.
 * @returns {object} Retorna os novos valores de daystreak e daystreakShield.
 */
const updateDaystreakValues = (daystreak, daystreakShield, diff) => {
  // Inicializa as variáveis com os valores atuais
  let newDaystreak = daystreak;
  let newDaystreakShield = daystreakShield;

  // Se o escudo do dia estiver zerado
  if (daystreakShield === 0) {
    // Reinicia o dia
    newDaystreak = 1;
  } else {
    // Se a diferença de dias for igual ao escudo do dia
    if (diff === daystreakShield) {
      // Reinicia o escudo do dia
      newDaystreakShield = 1;
    } else if (diff > daystreakShield) {
      // Se a diferença de dias for maior que o escudo do dia
      // Reinicia tanto o dia quanto o escudo do dia
      newDaystreakShield = 0;
      newDaystreak = 1;
    } else {
      // Se a diferença de dias for menor que o escudo do dia
      // Reduz o escudo do dia pela diferença de dias menos um
      newDaystreakShield -= diff - 1;
    }
  }

  // Retorna os novos valores de dia e escudo do dia
  return { newDaystreak, newDaystreakShield };
};

/**
 * Atualiza o daystreak e o daystreakShield do campeão.
 * @param {object} champion - O campeão.
 * @param {object} championData - Os dados do campeão.
 * @param {object} today - A data atual.
 * @param {object} lastLogin - A data do último login do campeão.
 */
const updateDaystreak = async (champion, championData, today, lastLogin) => {
  const diff = today.diff(lastLogin, "days");

  if (diff > 1) {
    const { newDaystreak, newDaystreakShield } = updateDaystreakValues(
      championData.daystreak,
      championData.daystreakShield,
      diff
    );

    await updateChampionDaystreakAndShield(
      champion.champion_id,
      newDaystreak,
      newDaystreakShield,
      today
    );
  }
};

/**
 * Função para gerar um convite.
 * Cria um token e retorna os dados brutos do token.
 *
 * @param {Object} tokenData - Os dados do token a serem criados.
 * @returns {Object} Os dados brutos do token criado.
 * @throws {Error} Se houver um erro ao criar o token.
 */
const createToken = async (tokenData) => {
  if (!tokenData) {
    throw new Error("tokenData é inválido.");
  }
  try {
    const token = await Token.create(tokenData);
    const rawData = token.get({ plain: true });
    return rawData;
  } catch (error) {
    console.error("Erro ao gerar convite:", error);
    throw new Error("Erro ao gerar convite: " + error.message);
  }
};

/**
 * Função para encontrar um token.
 * Busca um token e retorna os dados brutos do token.
 *
 * @param {string} token - O token a ser buscado.
 * @returns {Object} Os dados brutos do token encontrado.
 * @throws {Error} Se houver um erro ao buscar o token.
 */
const findToken = async (token) => {
  if (!token) {
    throw new Error("Token é inválido.");
  }
  try {
    const foundToken = await Token.findOne({
      where: { token },
      raw: true,
    });
    return foundToken;
  } catch (error) {
    console.error("Erro ao buscar o token:", error);
    throw new Error("Erro ao buscar o token: " + error.message);
  }
};

/**
 * Função para atualizar um token.
 * Atualiza um token para ser usado e retorna o token atualizado.
 *
 * @param {string} token - O token a ser atualizado.
 * @returns {Object} O token atualizado.
 * @throws {Error} Se houver um erro ao atualizar o token.
 */
const updateToken = async (token) => {
  try {
    if (!token) {
      throw new Error("Token é inválido.");
    }

    const [updatedRows] = await Token.update(
      { used: true },
      {
        where: { token },
      }
    );

    if (updatedRows !== 1) {
      throw new Error("Token não foi atualizado.");
    }

    const updatedToken = await Token.findOne({
      where: { token },
      raw: true,
    });

    return updatedToken;
  } catch (error) {
    console.error("Erro ao atualizar o token:", error);

    throw new Error("Erro ao atualizar o token: " + error.message);
  }
};

/**
 * Função para criar um token JWT.
 * @param {object} payload - O payload para o token.
 * @returns {string} Retorna o token JWT.
 */
const createJWToken = (payload) => {
  return jwt.sign(payload, SECRET, { expiresIn: "1h" });
};

/**
 * Função de login para um campeão.
 * @param {object} loginData - Os dados do campeão para login.
 * @returns {object|boolean} Retorna um objeto contendo a validade do login e os dados atualizados do campeão se bem-sucedido, falso caso contrário.
 */
const login = async (loginData) => {
  try {
    const { username, password } = loginData;

    const champion = await findChampionByUsername(username);

    if (!champion) return false;

    const isValid = await isValidPassword(password, champion);

    if (!isValid) return false;

    const { champion_id, name } = champion;
    const token = createJWToken({ champion_id, name });

    const championData = await getChampionById(champion_id);

    const today = moment().tz(TIMEZONE).startOf("day");
    const lastLogin = moment(champion.lastLogin).tz(TIMEZONE).startOf("day");

    await updateDaystreak(champion, championData, today, lastLogin);

    const champUpdated = await getChampionById(champion_id);

    return { isValid, champUpdated, token: `Bearer ${token}` };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Função para criar uma autenticação de login.
 * Cria um campeão e uma autenticação de login e retorna a autenticação de login criada.
 *
 * @param {Object} loginData - Os dados da autenticação de login a serem criados.
 * @returns {Object} A autenticação de login criada.
 * @throws {Error} Se houver um erro ao criar o campeão ou a autenticação de login.
 */
const createLogin = async (loginData, fileData) => {
  try {
    if (!loginData || !loginData.username || !loginData.password) {
      throw new Error("Dados de login são inválidos.");
    }

    const champion = await createChampion(loginData, fileData);

    const hash = await bcrypt.hash(loginData.password, 13);

    const loginAuthentication = await Authentication.create({
      username: loginData.username,
      password: hash,
      champion_id: champion.id,
    });

    await updateToken(loginData.token);

    return loginAuthentication;
  } catch (error) {
    console.error("Erro ao criar a autenticação de login:", error);
    throw new Error("Erro ao criar a autenticação de login: " + error.message);
  }
};

module.exports = {
  login,
  createLogin,
  createToken,
  findToken,
  updateToken,
  findChampionByUsername,
};
