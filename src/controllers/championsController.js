const championsServices = require("../services/championsServices");

const getChampionById = async (req, res) => {
  try {
    const { id } = req.params;

    const champion = await championsServices.getChampionById(id);

    if (!champion) {
      return res.status(404).json({ message: "Campeão não encontrado" });
    }

    return res.status(200).json({ champion });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao buscar o campeão" });
  }
};

const getAllChampions = async (_req, res) => {
  try {
    const champions = await championsServices.getAllChampions();

    return res.status(200).json({ champions });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Erro ao buscar todos os campeões" });
  }
};

const updateChampionBiography = async (req, res) => {
  try {
    const { id } = req.params;
    const championBio = req.body;

    const updatedChampBio = await championsServices.updateChampionBiography(
      id,
      championBio
    );

    return res.status(200).json({ updatedChampBio });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateChampionExp = async (req, res) => {
  try {
    const { id } = req.params;
    const championExp = req.body;

    const updatedChampionExp = await championsServices.updateChampionExp(
      id,
      championExp
    );

    return res.status(200).json({ updatedChampionExp });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateChampionDaystreak = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedChampionDaystreak =
      await championsServices.updateChampionDaystreak(id);

    return res.status(200).json({ updatedChampionDaystreak });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getChampionById,
  getAllChampions,
  updateChampionBiography,
  updateChampionExp,
  updateChampionDaystreak,
};
