const express = require('express');

const {
    getDashboardStats,
    GetLatestFiveBookingByVenueManager,
    revenueForMonthAndYearChart,
    revenueForYearChart
} = require('../controllers/dashboard.controller');
const {
    protect,
    venueManagerProtect
} = require('../../User/middleware/authMiddleware');

const dashboardRouter = express.Router();

dashboardRouter.get('/venues', getDashboardStats);
dashboardRouter.get('/bookings', protect, venueManagerProtect, GetLatestFiveBookingByVenueManager);
dashboardRouter.get('/revenue', protect, venueManagerProtect, revenueForMonthAndYearChart);
dashboardRouter.get('/revenue/year', protect, venueManagerProtect, revenueForYearChart);

module.exports = dashboardRouter;