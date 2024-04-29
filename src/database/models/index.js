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
const Achievement = require("./achievement");
const AchievementsCompleted = require("./achievementsCompleted");
const MonthlyChallenge = require("./monthlyChallenge");
const Quests = require("./quests");
const ActivitiesIntensity = require("./activitiesIntensity");
const StatsDetails = require("./statsDetails");
const DailyActivities = require("./dailyActivities");

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
Champion.hasMany(AchievementsCompleted, {
  foreignKey: "champion_id",
  as: "achievementsCompleted",
});
AchievementsCompleted.belongsTo(Champion, {
  foreignKey: "champion_id",
  as: "champion",
});
Achievement.hasMany(AchievementsCompleted, {
  foreignKey: "achievement_id",
  as: "achievementsCompleted",
});
AchievementsCompleted.belongsTo(Achievement, {
  foreignKey: "achievement_id",
  as: "achievement",
});
Champion.hasMany(Quests, {
  foreignKey: "champion_id",
  as: "quests",
});
Quests.belongsTo(Champion, {
  foreignKey: "champion_id",
  as: "champion",
});
Champion.hasOne(MonthlyChallenge, {
  foreignKey: "champion_id",
  as: "monthlyChallenge",
});
MonthlyChallenge.belongsTo(Champion, {
  foreignKey: "champion_id",
  as: "champion",
});
Champion.hasOne(ActivitiesIntensity, {
  foreignKey: "champion_id",
  as: "activitiesIntensity",
});
ActivitiesIntensity.belongsTo(Champion, {
  foreignKey: "champion_id",
  as: "champion",
});
Champion.hasOne(StatsDetails, {
  foreignKey: "champion_id",
  as: "statsDetails",
});
StatsDetails.belongsTo(Champion, {
  foreignKey: "champion_id",
  as: "champion",
});
Champion.hasMany(DailyActivities, {
  foreignKey: "champion_id",
  as: "dailyActivities",
});
DailyActivities.belongsTo(Champion, {
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
  Achievement,
  AchievementsCompleted,
  MonthlyChallenge,
  Quests,
  ActivitiesIntensity,
  StatsDetails,
  DailyActivities,
};
