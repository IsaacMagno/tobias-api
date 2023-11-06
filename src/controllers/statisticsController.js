const statisticsServices = require("../services/statisticsServices");

const getStatistics = async (req, res) => {
  try {
    const { id } = req.params;
    const statistics = await statisticsServices.findStatisticById(id);

    return res.status(200).json({ statistics });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getStatistics,
};
