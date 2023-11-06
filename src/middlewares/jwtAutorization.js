const jwt = require("jsonwebtoken");
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

module.exports = verifyJWT;
