const EventService = require('../services/event.service');
const { HTTP_STATUS } = require('../utils/http');
const { makeResponse } = require('../utils/response');
const Event = require('../models/event.model');
const tokenHelper = require('../helpers/token.helper');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const createEvent = async (req, res) => {
  const event = await EventService.createEvent(req.body, req.user);
  console.log(req.body);
  return makeResponse({
    res,
    message: 'Event added successfully',
    data: event,
  });
};

const getEventById = async (req, res) => {
  const event = await EventService.getEventById(req.params.id);
  if (!event)
    return makeResponse({
      res,
      success: false,
      message: `Event not found with id:${req.params.id}`,
      status: HTTP_STATUS.BAD_REQUEST,
    });
  return makeResponse({
    res,
    message: 'Data retrieval successful',
    data: event,
  });
};

const getAllEvents = async (req, res) => {
  const events = await Event.find({});
  res.json(events);
};

const updateEventById = async (req, res) => {
  const event = req.body;
  const id = req.params.id;

  const updatedBlog = await Event.findByIdAndUpdate(id, event, { new: true });

  updatedBlog
    ? res.status(200).json(updatedBlog.toJSON())
    : res.status(404).end();
};

const deleteEventById = async (req, res) => {
  const id = req.params.id;
  const event = await Event.findById(id);
  await event.deleteOne({ _id: id });
  res.sendStatus(204).end();
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEventById,
  deleteEventById,
};
