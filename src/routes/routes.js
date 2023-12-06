router = require("express").Router();

const championsController = require("../controllers/championsController");
const authenticationController = require("../controllers/authenticationController");
const filesController = require("../controllers/filesController");
const uploadImage = require("../middlewares/uploadImage");
const calendarController = require("../controllers/calendarController");
const activitiesController = require("../controllers/activitiesController");
const itemsController = require("../controllers/itemController");
const achievementsController = require("../controllers/achievementController");
const quotesController = require("../controllers/quoteController");
const goalController = require("../controllers/goalController");
const achievementsCompletedController = require("../controllers//achievementsCompletedController");
const questsController = require("../controllers/questsController");
const monthlyChallengeController = require("../controllers/monthlyChallengeController");

const validateRegister = require("../middlewares/validateRegister");

// Autenticação
router.post(
  "/create-new-champion",
  uploadImage.single("file"),
  validateRegister,
  authenticationController.createChampion
);
router.post("/champion-login", authenticationController.login);

// Campeões
router.get("/champions", championsController.getAllChampions);
router.get("/champion/:id", championsController.getChampionByIdFull);

// Upload
router.get("/uploads", filesController.getAllFiles);
router.post("/uploads", uploadImage.single("file"), filesController.uploadFile);

//Calendario
router.post("/calendar/:id", calendarController.createCalendar);

// Atividades
router.post("/activities/:id", activitiesController.createActivities);

// Items
router.get("/items", itemsController.getAllItems);
router.get("/item/:id", itemsController.getItemById);
router.get("/items/:store", itemsController.getItemsByStore);
router.post("/item", itemsController.createItem);
router.put("/item/:id", itemsController.updateItem);
router.delete("/item/:id", itemsController.deleteItem);

// Conquistas
router.get("/achievements", achievementsController.getAllAchievements);
router.get("/achievement/:id", achievementsController.getAchievementById);
router.post("/achievement", achievementsController.createAchievement);
router.put("/achievement/:id", achievementsController.updateAchievement);
router.delete("/achievement/:id", achievementsController.deleteAchievement);

// Frases
router.get("/quote", quotesController.getAllQuotes);
router.get("/random-quote", quotesController.randomSelectQuote);

// Goals
router.get("/goal", goalController.readGoal);
router.get("/goal/:id", goalController.readGoal);
router.post("/goal", goalController.createGoal);
router.put("/goal/:id", goalController.updateGoal);
router.delete("/goal/:id", goalController.deleteGoal);

// Achievements Completed
router.get(
  "/achivementCompleted",
  achievementsCompletedController.getAllAchievementsCompleted
);
router.get(
  "/achivementCompleted/:id",
  achievementsCompletedController.getAchievementCompleted
);
router.post(
  "/achivementCompleted",
  achievementsCompletedController.createAchievementCompleted
);
router.put(
  "/achivementCompleted/:id",
  achievementsCompletedController.updateAchievementCompleted
);
router.delete(
  "/achivementCompleted/:id",
  achievementsCompletedController.deleteAchievementCompleted
);

// Quests
router.get("/quests", questsController.getAllQuests);
router.get("/quests/:id", questsController.getQuestById);
router.post("/quests", questsController.createQuest);
router.put("/quests/:id", questsController.updateQuest);
router.delete("/quests/:id", questsController.deleteQuest);

// Monthly Challenge
router.get(
  "/monthlyChallenge",
  monthlyChallengeController.getAllMonthlyChallenges
);
router.get(
  "/monthlyChallenge/:id",
  monthlyChallengeController.getMonthlyChallengeById
);
router.post(
  "/monthlyChallenge",
  monthlyChallengeController.createMonthlyChallenge
);
router.put(
  "/monthlyChallenge/:id",
  monthlyChallengeController.updateMonthlyChallenge
);
router.delete(
  "/monthlyChallenge/:id",
  monthlyChallengeController.deleteMonthlyChallenge
);

module.exports = router;
