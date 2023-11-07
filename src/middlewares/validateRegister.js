const fs = require("fs");
const authenticationService = require("../services/authenticationServices");

const validateRegister = async (req, res, next) => {
  const { token, username } = req.body;

  const invite = await authenticationService.findToken(token);

  if (!invite || invite.used) {
    fs.unlinkSync(req.file.path);
    return res.status(400).json({ message: "Convite inválido" });
  }

  const usernameValid = await authenticationService.findChampionByUsername(
    username
  );

  if (usernameValid !== null) {
    fs.unlinkSync(req.file.path);
    return res.status(400).json({ message: "Nome de usuário já existe." });
  }

  next();
};

module.exports = validateRegister;
