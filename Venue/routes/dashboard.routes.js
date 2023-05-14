const express = require('express');

const {
    getDashboardStats,
    GetLatestFiveBookingByVenueManager
} = require('../controllers/dashboard.controller');
const {
    protect,
    venueManagerProtect
} = require('../../User/middleware/authMiddleware');

const dashboardRouter = express.Router();

dashboardRouter.get('/venues', getDashboardStats);
dashboardRouter.get('/bookings', protect, venueManagerProtect, GetLatestFiveBookingByVenueManager);

module.exports = dashboardRouter;