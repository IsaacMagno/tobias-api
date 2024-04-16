const cron = require("cron");
const { Quests, Champion } = require("../database/models");

const activities = [
  {
    questName: "Correr 750 metros",
    questGoal: 0.75, // 700 metros convertidos para km
    questReward: { tobiasCoins: 175, xp: 200 },
    link: "kmRun",
  },
  {
    questName: "Pedalar 3 km",
    questGoal: 3, // 3 km
    questReward: { tobiasCoins: 175, xp: 200 },
    link: "kmBike",
  },
  {
    questName: "Fazer 500 saltos de corda",
    questGoal: 500, // 500 saltos
    questReward: { tobiasCoins: 175, xp: 200 },
    link: "jumpRope",
  },
  {
    questName: "Fazer 60 repetições de treino superior",
    questGoal: 60, // 66 repetições
    questReward: { tobiasCoins: 175, xp: 200 },
    link: "upperLimb",
  },
  {
    questName: "Fazer 60 repetições de treino abdominal",
    questGoal: 60, // 66 repetições
    questReward: { tobiasCoins: 175, xp: 200 },
    link: "abs",
  },
  {
    questName: "Fazer 60 repetições de treino inferior",
    questGoal: 60, // 66 repetições
    questReward: { tobiasCoins: 175, xp: 200 },
    link: "lowerLimb",
  },
  {
    questName: "Estudar por 30 minutos",
    questGoal: 0.5, // 30 minutos convertidos para horas
    questReward: { tobiasCoins: 175, xp: 200 },
    link: "study",
  },
  {
    questName: "Meditar por 5 minutos",
    questGoal: 0.08, // 5 minutos convertidos para horas (aproximadamente 0.083)
    questReward: { tobiasCoins: 175, xp: 200 },
    link: "meditation",
  },
  {
    questName: "Ler por 15 minutos",
    questGoal: 0.25, // 15 minutos convertidos para horas
    questReward: { tobiasCoins: 175, xp: 200 },
    link: "reading",
  },
  {
    questName: "Beber 2 litros de água",
    questGoal: 2, // 2 litros
    questReward: { tobiasCoins: 175, xp: 200 },
    link: "drinks",
  },
  {
    questName: "Fazer 3 refeições saudáveis",
    questGoal: 3, // 3 refeições
    questReward: { tobiasCoins: 175, xp: 200 },
    link: "meals",
  },
];

const deleteIncompleteQuests = async () => {
  try {
    await Quests.destroy({
      where: {
        completed: false,
      },
    });
    console.log("Quests incompletas deletadas com sucesso.");
  } catch (error) {
    console.error("Erro ao deletar quests incompletas:", error);
  }
};

const generateDailyQuestsForUser = async (userId) => {
  let selectedActivities = [];

  // Embaralha as atividades
  const shuffledActivities = activities.sort(() => 0.5 - Math.random());

  // Seleciona 3 quests únicas
  for (let activity of shuffledActivities) {
    if (
      selectedActivities.length < 3 &&
      !selectedActivities.find((a) => a.questName === activity.questName)
    ) {
      selectedActivities.push(activity);
    }
  }

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1); // Adiciona um dia à data atual

  for (let activity of selectedActivities) {
    await Quests.create({
      champion_id: userId,
      questName: activity.questName,
      questGoal: activity.questGoal,
      questActual: 0,
      questLimitDate: tomorrow, // Define a data limite como o dia seguinte
      questReward: JSON.stringify(activity.questReward),
      completed: false,
      link: activity.link,
    });
  }
};

async function generateDailyQuests() {
  console.log(`Cron executando às ${new Date().toLocaleTimeString()}`);

  console.log("Deletando quests diárias incompletas...");
  await deleteIncompleteQuests();
  console.log("Quests diárias incompletas deletadas com sucesso.");

  console.log("Criando quests diárias para cada campeão...");
  const users = await Champion.findAll();
  for (let user of users) {
    await generateDailyQuestsForUser(user.id);
  }
  console.log("Quests diárias criadas com sucesso.");

  console.log("Cron job finalizado, aguardando meia-noite do próximo dia.");
}

// Configuração do cron job para executar todos os dias à meia-noite
const job = new cron.CronJob("00 00 00 * * *", generateDailyQuests);
job.start();
console.log("Cron job configurado para executar à meia-noite todos os dias.");

module.exports = {
  activities,
};

// Teste cron

// setTimeout(() => {
//   // Obter o próximo minuto
//   const now = new Date();
//   now.setMinutes(now.getMinutes() + 1);
//   now.setSeconds(0); // Configura para o início do minuto

//   const minute = now.getMinutes();
//   const hour = now.getHours();
//   const day = now.getDate();
//   const month = now.getMonth() + 1; // Os meses em JavaScript começam do 0
//   const dayOfWeek = now.getDay();

//   // Configuração do cron para executar no próximo minuto
//   const job = new cron.CronJob(
//     `0 ${minute} ${hour} ${day} ${month} ${dayOfWeek}`,
//     () => {
//       generateDailyQuests();
//       job.stop(); // Para o cron job após a execução
//       console.log(
//         "Cron job executado uma vez, no próximo minuto inteiro após 30 segundos do início do servidor"
//       );
//     }
//   );

//   job.start();
//   console.log(
//     "Cron job configurado para executar uma vez, no próximo minuto inteiro após 30 segundos do início do servidor"
//   );
// }, 5000); // Aguarda 30 segundos para configurar o cron job
