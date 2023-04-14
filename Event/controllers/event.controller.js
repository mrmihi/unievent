const EventService = require('../services/event.service');
const { HTTP_STATUS } = require('../utils/http');
const { makeResponse } = require('../utils/response');
const { event } = require('../models/event.model');
const tokenHelper = require('../helpers/token.helper');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const createEvent = async (req, res) => {
  const token = tokenHelper.getTokenFrom(req);

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  if (!decodedToken.id) {
    return makeResponse({
      res,
      message: 'token missing or invalid',
      status: HTTP_STATUS.UNAUTHORIZED,
    });
  }

  const user = await User.findById(decodedToken.id);

  const event = await EventService.createEvent(req.body, user);
  console.log(req.body);
  return makeResponse({
    res,
    message: 'Event added successfully',
    data: event,
  });
};

const getAllEvents = async (req, res) => {
  const blogs = await Event.find({});
  res.json(blogs);
};

const getEventById = async (req, res) => {
  const blog = await event.findById(req.params.id);

  if (blog) {
    res.json(event.toJSON());
  } else {
    res.status(404).end();
  }
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
