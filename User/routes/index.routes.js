const express = require('express');
const userRoutes = require('./user.routes');
const organizationRouter = require('./org.routes');

const routes = express.Router(); //create router

routes.use('/users', userRoutes); //use user routes
routes.use('/org', organizationRouter); //use organization routes

module.exports = routes;
