const calendarServices = require("../services/calendarServices");

const getCalendar = async (_req, res) => {
  try {
    const calendars = await calendarServices.getCalendar();

    return res.status(200).json({ calendars });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createCalendar = async (_req, res) => {
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
    const eventDate = req.body;

    const deleteEvent = await calendarServices.deleteEvent(eventDate, id);
    createCalendar;
    return res.status(200).json({ deleteEvent });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCalendar,
  createEvent,
  deleteEvent,
  createCalendar,
};
