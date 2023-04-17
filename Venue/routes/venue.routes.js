const express = require('express');
const { createVenue } = require('../controllers/venue.controller');
const { protect, venueManagerProtect } = require('../../User/middleware/authMiddleware');

const venueRouter = express.Router();

venueRouter.post('/', protect, venueManagerProtect, createVenue)
// venueRouter.get('/', protect, getAllVenues)
// venueRouter.get('/:id', getVenueById)
//venueRouter.get('/manager/:id', getVenuesByManagerId)
// venueRouter.put('/:id', updateVenueById)
// venueRouter.delete('/:id', deleteVenueById)

module.exports = venueRouter;
