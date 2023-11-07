router = require("express").Router();

const championsController = require("../controllers/championsController");
const authenticationController = require("../controllers/authenticationController");
const filesController = require("../controllers/filesController");
const uploadImage = require("../middlewares/uploadImage");
const calendarController = require("../controllers/calendarController");
const activitiesController = require("../controllers/activitiesController");
const itemsController = require("../controllers/itemController");
const achievementsController = require("../controllers/achievementController");
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

module.exports = router;
