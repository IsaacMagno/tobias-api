const statsDetailsServices = require("../services/statsDetailsServices");

const getStatsDetailsById = async (req, res) => {
  try {
    const { id } = req.params;

    const statsDetailsFromId = await statsDetailsServices.getStatsDetailsById(
      id
    );

    return res.status(200).json({ statsDetailsFromId });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getStatsDetailsById,
};
