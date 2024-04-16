const { Item } = require("../database/models");
const { getChampionById } = require("./championsServices");

/**
 * Busca todos os itens de uma loja específica.
 * @param {string} store - O nome da loja.
 * @returns {object[]} Retorna uma lista de itens da loja especificada.
 */
const getItemsByStore = async (store) => {
  try {
    const items = await Item.findAll({ where: { store } });
    return items;
  } catch (error) {
    console.error(`Erro ao buscar itens da loja ${store}:`, error);
    throw error;
  }
};

/**
 * Busca um item pelo ID.
 * @param {number} id - O ID do item.
 * @returns {object} Retorna o item com o ID especificado.
 */
const getItemById = async (id) => {
  try {
    const item = await Item.findByPk(id);
    return item;
  } catch (error) {
    console.error(`Item com o id:${id} não encontrado:`, error);
    throw error;
  }
};

/**
 * Busca todos os itens.
 * @returns {object[]} Retorna uma lista de todos os itens.
 */
const getAllItems = async () => {
  try {
    const items = await Item.findAll();
    return items;
  } catch (error) {
    console.error("Erro ao buscar todos os itens:", error);
    throw error;
  }
};

/**
 * Cria um novo item.
 * @param {object} itemData - Os dados do novo item.
 * @returns {object} Retorna o novo item criado.
 * @throws {Error} Lança um erro se o valor do campo 'store' não for válido.
 */
const createItem = async (itemData) => {
  try {
    // Verifique se o valor do campo 'store' é válido
    const validStores = ["tobiasStore", "championsStore"];
    if (!validStores.includes(itemData.store)) {
      throw new Error(`Valor inválido para o campo 'store': ${itemData.store}`);
    }

    const item = await Item.create(itemData);
    return item;
  } catch (error) {
    console.error("Erro ao criar item:", error);
    throw error;
  }
};

/**
 * Atualiza um item existente.
 * @param {number} id - O ID do item a ser atualizado.
 * @param {object} itemData - Os novos dados do item.
 * @returns {object} Retorna o item atualizado.
 */
const updateItem = async (id, itemData) => {
  try {
    const item = await Item.findByPk(id);
    if (!item) throw new Error("Item não encontrado");
    await item.update(itemData);
    return item;
  } catch (error) {
    console.error(`Erro ao atualizar item com id:${id}:`, error);
    throw error;
  }
};

/**
 * Deleta um item existente.
 * @param {number} id - O ID do item a ser deletado.
 */
const deleteItem = async (id) => {
  try {
    const item = await Item.findByPk(id);
    if (!item) throw new Error("Item não encontrado");
    await item.destroy();
  } catch (error) {
    console.error(`Erro ao deletar item com id:${id}:`, error);
    throw error;
  }
};

const buyDaystreakShield = async ({ buyData }) => {
  try {
    const item = await getItemById(buyData.itemId);
    const champion = await getChampionById(buyData.id);

    if (champion.daystreakShield < 3) {
      await champion.update({
        daystreakShield: champion.daystreakShield + 1,
        tobiasCoins: champion.tobiasCoins - item.price,
      });
    } else {
      return { error: { message: "Campeão já tem 3 shields!" } };
    }
  } catch (error) {
    console.error(`Erro ao comprar item com id:${buyData.itemId}:`, error);
    throw error;
  }
};

module.exports = {
  getItemsByStore,
  getItemById,
  getAllItems,
  createItem,
  updateItem,
  deleteItem,
  buyDaystreakShield,
};
