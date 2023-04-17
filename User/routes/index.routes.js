const express = require('express');
const userRoutes = require('./user.routes');
const organizationRouter = require('./organization.routes');

const routes = express.Router();//create router

routes.use('/users', userRoutes);//use user routes
routes.use('/organizations', organizationRouter);//use organization routes

module.exports = routes;
