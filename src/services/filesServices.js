const { File } = require("../database/models");

/**
 * Faz o upload de um arquivo.
 * @param {string} fileName - O nome do arquivo.
 * @param {number} champion_id - O ID do campeão.
 * @returns {object} Retorna o arquivo carregado.
 * @throws {Error} Lança um erro se ocorrer um problema ao carregar o arquivo.
 */
const uploadFile = async (fileName, champion_id) => {
  try {
    const file = await File.create({
      image: fileName,
      champion_id,
    });

    return file;
  } catch (error) {
    console.error("Erro ao fazer upload do arquivo:", error);
    throw error;
  }
};

/**
 * Obtém todos os arquivos.
 * @returns {object[]} Retorna uma lista de todos os arquivos.
 * @throws {Error} Lança um erro se ocorrer um problema ao obter os arquivos.
 */
const getAllFiles = async () => {
  try {
    const allFiles = await File.findAll();

    return allFiles;
  } catch (error) {
    console.error("Erro ao obter todos os arquivos:", error);
    throw error;
  }
};

module.exports = {
  uploadFile,
  getAllFiles,
};
