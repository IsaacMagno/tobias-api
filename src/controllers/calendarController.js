const calendarServices = require("../services/calendarServices");

const getCalendarById = async (req, res) => {
  try {
    const { id } = req.params;

    const calendars = await calendarServices.findCalendarById(id, true);

    return res.status(200).json({ calendars });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getCalendar = async (req, res) => {
  try {
    const calendars = await calendarServices.getCalendar();

    return res.status(200).json({ calendars });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createCalendar = async (req, res) => {
  try {
    const { id } = req.params;

    const calendar = await calendarServices.createCalendar(id);

    return res.status(200).json({ calendar });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const evData = req.body;

    const newEvent = await calendarServices.createEvent(evData, id);

    return res.status(200).json({ newEvent });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { eventDate } = req.body;

    const deleteEvent = await calendarServices.deleteEvent(eventDate, id);

    return res.status(200).json({ deleteEvent });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const countEventDateByWeekDayAndColor = async (req, res) => {
  try {
    const { id } = req.params;
    const events = await calendarServices.countEventDateByWeekDayAndColor(id);

    return res.status(200).json({ events });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCalendarById,
  getCalendar,
  createEvent,
  deleteEvent,
  createCalendar,
  countEventDateByWeekDayAndColor,
};
