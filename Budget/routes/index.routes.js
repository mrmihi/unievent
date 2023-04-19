const express = require('express');

const budgetRouter = require('./budget.route');

const routes = express.Router();//create router

routes.use('/budgets', budgetRouter);//use budget routes

module.exports = routes;
