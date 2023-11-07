const authenticationService = require("../services/authenticationServices");
const { v4: uuidv4 } = require("uuid");

const generateInvite = async (_req, res) => {
  try {
    const newToken = uuidv4();

    const inviteGenerated = await authenticationService.createToken({
      token: newToken,
      used: false,
      champion_id: 1,
    });

    return res.status(200).json(inviteGenerated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createChampion = async (req, res) => {
  try {
    const championData = req.body;
    const fileData = req.file.filename;

    const createdChampion = await authenticationService.createLogin(
      championData,
      fileData
    );

    return res.status(200).json({ createdChampion });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const championData = req.body;

    const validLogin = await authenticationService.login(championData);

    return res.status(200).json({ validLogin });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createChampion,
  login,
  generateInvite,
};
