const express = require('express');
const {
    protect,
    venueManagerProtect,
} = require('../../User/middleware/authMiddleware');
const {
    createVenue,
    getAllVenues,
    getVenueById,
    getVenuesByManagerId,
    updateVenueById,
    deleteVenueById,
    getVenueAndReviews
} = require('../controllers/venue.controller');

const venueRouter = express.Router();

venueRouter.post('/', protect, venueManagerProtect, createVenue);
venueRouter.get('/', getAllVenues);
venueRouter.get('/:id', getVenueById);
venueRouter.get('/manager/:id', getVenuesByManagerId);
venueRouter.put('/:id', updateVenueById);
venueRouter.delete('/:id', deleteVenueById);
venueRouter.get('/:id/profile', getVenueAndReviews);

module.exports = venueRouter;
