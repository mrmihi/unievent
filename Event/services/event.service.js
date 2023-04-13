const Event = require('../models/event.model');

const createEvent = async ({
  name,
  description,
  headerImage,
  venue,
  startTime,
  endTime,
  status,
  category,
  speakers,
  capacity,
  tags,
  joinLink,
  host,
  faculty,
}) => {
  const event = new Event({
    name,
    description,
    headerImage,
    venue,
    startTime,
    endTime,
    status,
    category,
    speakers,
    capacity,
    tags,
    host,
    joinLink,
    faculty,
  });

  return event.save();
};

const getAllEvents = async () => {};
const getEventById = async () => {};
const updateEventById = async () => {};
const deleteEventById = async () => {};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEventById,
  deleteEventById,
};
