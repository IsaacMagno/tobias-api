const quoteServices = require("../services/quoteServices");

const randomSelectQuote = async (req, res) => {
  try {
    const quote = await quoteServices.randomSelectQuote();

    return res.status(200).json({ quote });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getQuote = async (req, res) => {
  try {
    const { id } = req.params;

    const quote = await quoteServices.getQuote(id);

    return res.status(200).json({ quote });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllQuotes = async (_req, res) => {
  try {
    const quotes = await quoteServices.getAllQuotes();

    return res.status(200).json({ quotes });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createQuote = async (req, res) => {
  try {
    const quoteData = req.body;

    const newQuote = await quoteServices.createQuote(quoteData);

    return res.status(201).json({ newQuote });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateQuote = async (req, res) => {
  try {
    const { id } = req.params;
    const quoteData = req.body;

    const updatedQuote = await quoteServices.updateQuote(id, quoteData);

    return res.status(200).json({ updatedQuote });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteQuote = async (req, res) => {
  try {
    const { id } = req.params;

    await quoteServices.deleteQuote(id);

    return res.status(200).json({ message: "Quote deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  randomSelectQuote,
  getQuote,
  getAllQuotes,
  createQuote,
  updateQuote,
  deleteQuote,
};
