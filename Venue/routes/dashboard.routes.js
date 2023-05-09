const express = require('express');

const {
    getDashboardStats
} = require('../controllers/dashboard.controller');

const dashboardRouter = express.Router();

dashboardRouter.get('/venues', getDashboardStats);

module.exports = dashboardRouter;