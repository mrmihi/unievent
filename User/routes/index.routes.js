const express = require('express');
const userRoutes = require('./user.routes');
const orgRouter = require('./organization.routes');

const routes = express.Router(); //create router

routes.use('/users', userRoutes); //use user routes
routes.use('/org', orgRouter); //use organization routes

module.exports = routes;
