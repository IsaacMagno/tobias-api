const authenticationService = require("../services/authenticationServices");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET;

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
    const { inviteToken } = req.body;

    const championData = req.body;

    const invite = await authenticationService.findToken(inviteToken);

    if (!invite || invite.used) {
      return res.status(400).json({ message: "Convite inválido" });
    }

    const createdChampion = await authenticationService.createLogin(
      championData,
      inviteToken
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

    if (validLogin.isValid) {
      const { id, name } = validLogin.champUpdated;
      const token = jwt.sign({ id, name }, SECRET, { expiresIn: "1h" });
      validLogin.token = `Bearer ${token}`;
    }

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
