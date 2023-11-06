const { Quote } = require("../database/models");

const ERROR_QUOTE_NOT_FOUND = "Citação não encontrada!";

/**
 * Obtém uma citação pelo ID.
 * @param {number} id - O ID da citação.
 * @returns {object} Retorna a citação correspondente ao ID fornecido.
 */
const getQuote = async (id) => {
  return await Quote.findByPk(id);
};

/**
 * Obtém todas as citações.
 * @returns {object[]} Retorna todas as citações.
 */
const getAllQuotes = async () => {
  return await Quote.findAll();
};

/**
 * Cria uma nova citação.
 * @param {object} quoteData - Os dados da nova citação.
 * @returns {object} Retorna a nova citação criada.
 */
const createQuote = async (quoteData) => {
  return await Quote.create(quoteData);
};

/**
 * Atualiza uma citação existente.
 * @param {number} id - O ID da citação a ser atualizada.
 * @param {object} quoteData - Os novos dados da citação.
 * @returns {object} Retorna a citação atualizada.
 */
const updateQuote = async (id, quoteData) => {
  const quote = await Quote.findByPk(id);

  if (!quote) return { error: ERROR_QUOTE_NOT_FOUND };

  return await quote.update(quoteData);
};

/**
 * Exclui uma citação existente.
 * @param {number} id - O ID da citação a ser excluída.
 */
const deleteQuote = async (id) => {
  const quote = await Quote.findByPk(id);

  if (!quote) return { error: ERROR_QUOTE_NOT_FOUND };

  await quote.destroy();
};

module.exports = {
  getQuote,
  getAllQuotes,
  createQuote,
  updateQuote,
  deleteQuote,
};
