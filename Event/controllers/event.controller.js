const EventService = require('../services/event.service');
const { HTTP_STATUS } = require('../utils/http');
const { makeResponse } = require('../utils/response');
const Event = require('../models/event.model');
const tokenHelper = require('../helpers/token.helper');
const jwt = require('jsonwebtoken');

const createEvent = async (req, res) => {
  const event = await EventService.createEvent(req.body);
  console.log(req.body);
  return makeResponse({
    res,
    message: 'Event added successfully!',
    data: event,
  });
};

//for shabs
const getEventById = async (req, res) => {
  const event = await EventService.getEventById(req.params.id)
    .populate('venue')
    .populate('orgId');

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
  const events = await Event.find({}).populate('venue').populate('orgId');
  res.json(events);
};

const updateEventById = async (req, res) => {
  const event = req.body;
  const id = req.params.id;

  const updatedEvent = await Event.findByIdAndUpdate(id, event, { new: true });

  updatedEvent
    ? res.status(200).json(updatedEvent.toJSON())
    : res.status(404).end();
};

const deleteEventById = async (req, res) => {
  const id = req.params.id;
  const event = await Event.findById(id);
  await event.deleteOne({ _id: id });
  res.sendStatus(204).end();
};

const getEventsByOrg = async (req, res) => {
  // const token = req.headers.authorization.split(' ')[1];
  // const decodedToken = jwt.verify(token, tokenHelper.secret);
  // const orgId = decodedToken.id;
  //orgId will be passed in as a parameter
  const orgId = req.params.id;
  const events = await Event.find({ orgId: orgId }).populate('venue');
  res.json(events);
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEventById,
  deleteEventById,
  getEventsByOrg,
};
