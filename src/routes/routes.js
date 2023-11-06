router = require("express").Router();

const championsController = require("../controllers/championsController");
const authenticationController = require("../controllers/authenticationController");
const filesController = require("../controllers/filesController");
const uploadImage = require("../middlewares/uploadImage");
const calendarController = require("../controllers/calendarController");
const activitiesController = require("../controllers/activitiesController");
const itemsController = require("../controllers/itemController");

// Autenticação
router.post("/create-new-champion", authenticationController.createChampion);
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

module.exports = router;
