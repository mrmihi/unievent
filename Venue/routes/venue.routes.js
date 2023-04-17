const express = require('express');

const venueRouter = express.Router();

venueRouter.get('/info', (req, res) => {
  res.json('Venue Router');
});

// venueRouter.post('/', createVenue)
// venueRouter.get('/', protect, getAllVenues)
// venueRouter.get('/:id', getVenueById)
//venueRouter.get('/manager/:id', getVenuesByManagerId)
// venueRouter.put('/:id', updateVenueById)
// venueRouter.delete('/:id', deleteVenueById)

module.exports = venueRouter;
