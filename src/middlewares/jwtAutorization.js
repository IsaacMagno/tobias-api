const jwt = require("jsonwebtoken");
const { createJWToken } = require("../services/authenticationServices");
const SECRET = process.env.SECRET;

const verifyJWT = (req, res, next) => {
  // Extrai o token do cabeçalho Authorization
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).send("Token não fornecido");
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(403).send("Falha na autenticação do token");
    }

    // Adiciona o payload decodificado à requisição
    req.user = decoded;

    next();
  });
};

const checkTokenAndRenew = async (token) => {
  try {
    // Verifique a validade do token
    const decoded = jwt.verify(token, SECRET);
    const currentTime = Date.now().valueOf() / 1000;

    // Se o token estiver prestes a expirar (por exemplo, menos de 20 minutos restantes)
    if (decoded.exp < currentTime + 20 * 60) {
      // Emita um novo token
      const newToken = createJWToken({
        champion_id: decoded.champion_id,
        name: decoded.name,
      });
      return newToken;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }

  // Se o token ainda é válido e não está prestes a expirar, retorne o token original
  return token;
};

const renewJWT = async (req, res, next) => {
  try {
    // Obtenha o token do cabeçalho de autorização
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401); // Se não houver token, retorne um erro 401

    // Verifique a validade do token
    const newToken = await checkTokenAndRenew(token);

    // Substitua o token antigo pelo novo no cabeçalho de autorização
    req.headers.authorization = `Bearer ${newToken}`;

    next(); // Passe para o próximo middleware ou rota
  } catch (error) {
    console.error(error);
    res.sendStatus(403); // Se algo der errado, retorne um erro 403
  }
};

module.exports = { verifyJWT, renewJWT };
