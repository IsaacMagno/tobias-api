const Champion = require("./champion");
const Statistic = require("./statistic");
const Activitie = require("./activities");
const File = require("./file");
const Calendar = require("./calendar");
const Goal = require("./goal");
const Event = require("./event");
const Authentication = require("./authentication");
const Token = require("./token");
const Quote = require("./quote");
const Item = require("./item");

Champion.hasOne(Statistic, {
  foreignKey: "champion_id",
  as: "statistics",
});
Statistic.belongsTo(Champion, {
  foreignKey: "champion_id",
  as: "champion",
});
Champion.hasOne(Activitie, {
  foreignKey: "champion_id",
  as: "activities",
});
Activitie.belongsTo(Champion, {
  foreignKey: "champion_id",
  as: "champion",
});
Champion.hasOne(File, {
  foreignKey: "champion_id",
  as: "files",
});
File.belongsTo(Champion, {
  foreignKey: "champion_id",
  as: "champion",
});
Champion.hasOne(Calendar, {
  foreignKey: "champion_id",
  as: "calendars",
});
Calendar.belongsTo(Champion, {
  foreignKey: "champion_id",
  as: "champion",
});
Calendar.hasMany(Event, {
  foreignKey: "calendar_id",
  as: "events",
});
Event.belongsTo(Calendar, {
  foreignKey: "calendar_id",
});
Champion.hasMany(Goal, {
  foreignKey: "champion_id",
  as: "goal",
});
Champion.hasOne(Authentication, {
  foreignKey: "champion_id",
  as: "authentication",
});
Authentication.belongsTo(Champion, {
  foreignKey: "champion_id",
  as: "champion",
});
Token.belongsTo(Champion, {
  foreignKey: "champion_id",
  as: "champion",
});

module.exports = {
  Champion,
  Statistic,
  Activitie,
  File,
  Calendar,
  Goal,
  Event,
  Authentication,
  Token,
  Quote,
  Item,
};
