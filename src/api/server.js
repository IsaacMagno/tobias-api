const port = process.env.PORT || 3000;
const app = require("./app");

require("../functions/generateDailyQuests");

app.listen(port);
console.log("Desenvolvido por Isaac Magno");
console.log(`API Online na porta ${port}`);
