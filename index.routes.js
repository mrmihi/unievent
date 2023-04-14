const express = require('express');

const routes = express.Router();

const eventsRouter = require('./Event/routes/index.routes');
const venueRouter = require('./Venue/routes/index.routes');

routes.use('/', eventsRouter)
routes.use('/', venueRouter)

module.exports = routes;
