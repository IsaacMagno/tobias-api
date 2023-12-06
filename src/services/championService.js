const { Champion } = require("../database/models");

/**
 * Função para obter um campeão pelo ID, incluindo todas as tabelas associadas.
 * Busca um campeão pelo ID e retorna o campeão encontrado, juntamente com todas as tabelas associadas.
 *
 * @param {number} id - O ID do campeão a ser buscado.
 * @returns {Object} O campeão encontrado, incluindo todas as tabelas associadas.
 * @throws {Error} Se houver um erro ao buscar o campeão.
 */
const getChampionByIdFull = async (id) => {
  try {
    const champion = await Champion.findOne({
      where: { id },
      include: [{ all: true, nested: true }], // Inclui todas as tabelas associadas
    });

    // Remove a chave 'authentication' do objeto retornado
    delete champion.dataValues.authentication;

    return champion;
  } catch (error) {
    console.error(`Erro ao buscar o campeão com id ${id}: ${error}`);
    throw error;
  }
};

module.exports = {
  getChampionByIdFull,
};
