const express = require("express");
const protectedRouter = express.Router();
const verifyJWT = require("../middlewares/jwtAutorization");

const championsController = require("../controllers/championsController");
const authenticationController = require("../controllers/authenticationController");
const calendarController = require("../controllers/calendarController");
const goalController = require("../controllers/goalController");
const statisticsController = require("../controllers/statisticsController");
const activitiesController = require("../controllers/activitiesController");
const quotesController = require("../controllers/quoteController");

protectedRouter.use(verifyJWT);

// Autenticação
protectedRouter.post(
  "/generate-invite",
  authenticationController.generateInvite
);

// Campeões
protectedRouter.get("/champions/:id", championsController.getChampionById);
protectedRouter.put(
  "/champion/bio/:id",
  championsController.updateChampionBiography
);
protectedRouter.put("/champion/xp/:id", championsController.updateChampionExp);
protectedRouter.put(
  "/champion/daystreak/:id",
  championsController.updateChampionDaystreak
);

// Calendario
protectedRouter.get("/calendars", calendarController.getCalendar);

// Eventos
protectedRouter.post("/event/:id", calendarController.createEvent);
protectedRouter.delete("/event/:id", calendarController.deleteEvent);

// Estatisticas
protectedRouter.get("/statistics/:id", statisticsController.getStatistics);

// Atividades
protectedRouter.get("/activities/:id", activitiesController.getActivities);
protectedRouter.put("/activities/:id", activitiesController.updateActivities);

// Goals
protectedRouter.get("/goal", goalController.readGoal);
protectedRouter.get("/goal/:id", goalController.readGoal);
protectedRouter.post("/goal", goalController.createGoal);
protectedRouter.put("/goal/:id", goalController.updateGoal);
protectedRouter.delete("/goal/:id", goalController.deleteGoal);

// Frases
protectedRouter.get("/quote/:id", quotesController.getQuote);
protectedRouter.get("/quote", quotesController.getAllQuotes);
protectedRouter.post("/quote", quotesController.createQuote);
protectedRouter.put("/quote/:id", quotesController.updateQuote);
protectedRouter.delete("/quote/:id", quotesController.deleteQuote);

module.exports = protectedRouter;
