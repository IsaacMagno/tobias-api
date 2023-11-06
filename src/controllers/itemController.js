const itemServices = require("../services/itemServices");

const getItemsByStore = async (req, res) => {
  try {
    const { store } = req.params;

    const items = await itemServices.getItemsByStore(store);

    return res.status(200).json({ items });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getItemById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await itemServices.getItemById(id);

    return res.status(200).json({ item });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllItems = async (_req, res) => {
  try {
    const items = await itemServices.getAllItems();

    return res.status(200).json({ items });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createItem = async (req, res) => {
  try {
    const item = await itemServices.createItem(req.body);

    return res.status(201).json({ item });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await itemServices.updateItem(id, req.body);

    return res.status(200).json({ item });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    await itemServices.deleteItem(id);

    return res.status(200).json({ message: "Item deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getItemsByStore,
  getItemById,
  getAllItems,
  createItem,
  updateItem,
  deleteItem,
};
