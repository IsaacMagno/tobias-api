const { Calendar, Event } = require("../database/models");

/**
 * Encontra um calendário pelo ID do campeão.
 * @param {number} id - O ID do campeão.
 * @returns {object} Retorna o calendário se encontrado, null caso contrário.
 */
const findCalendarById = async (id) => {
  // Busca o calendário pelo ID do campeão
  const calendar = await Calendar.findOne({
    where: { champion_id: id },
    raw: true,
  });
  return calendar;
};

/**
 * Cria um novo calendário.
 * @param {number} id - O ID do campeão.
 * @returns {object} Retorna o calendário criado.
 * @throws {Error} Lança um erro se o campeão já tiver um calendário ou se ocorrer um problema ao criar o calendário.
 */
const createCalendar = async (id) => {
  try {
    // Verifica se o campeão já tem um calendário
    const championAlreadyHaveCalendar = await findCalendarById(id);

    if (championAlreadyHaveCalendar) {
      throw new Error(`O campeão com ID ${id} já tem calendário!`);
    }

    // Cria o calendário para o campeão
    const createdCalendar = await Calendar.create({
      champion_id: id,
      red_day: 0,
      yellow_day: 0,
      green_day: 0,
    });

    return createdCalendar;
  } catch (error) {
    console.error(`Erro ao criar calendário para o campeão ${id}:`, error);
    throw error;
  }
};

/**
 * Obtém todos os calendários e seus eventos associados.
 * @returns {object[]} Retorna uma lista de calendários.
 */
const getCalendar = async () => {
  try {
    const calendars = await Calendar.findAll({
      include: { all: true },
    });

    return calendars;
  } catch (error) {
    console.error("Erro ao obter calendários:", error);
    throw error;
  }
};

/**
 * Cria um novo evento.
 * @param {object} newEvent - Os dados do novo evento.
 * @param {number} id - O ID do calendário.
 * @returns {object} Retorna o evento criado.
 */
const createEvent = async ({ event }, id) => {
  try {
    event.calendar_id = parseInt(id);

    const createdEvent = await Event.create(event);

    return createdEvent;
  } catch (error) {
    console.error("Erro ao criar evento:", error);
    throw error;
  }
};

/**
 * Exclui um evento existente.
 * @param {string} date - A data do evento.
 * @param {number} id - O ID do calendário.
 * @returns {number} Retorna o número de eventos excluídos.
 */
const deleteEvent = async ({ date }, id) => {
  try {
    const deletedEvent = await Event.destroy({
      where: { calendar_id: id, date },
    });
    return deletedEvent;
  } catch (error) {
    console.error("Erro ao excluir evento:", error);
    throw error;
  }
};

module.exports = {
  createCalendar,
  getCalendar,
  createEvent,
  deleteEvent,
};
