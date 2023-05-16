const express = require('express');
const userRoutes = require('./user.routes');


const routes = express.Router(); //create router

routes.use('/users', userRoutes); //use user routes

module.exports = routes;
