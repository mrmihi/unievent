const express = require('express');

const { 
  createBooking, 
  getAllBookings, 
  getBookingById,
  getBookingByVenueId,
  getBookingByOrganizerId,
  updateBookingById,
  deleteBookingById,
  getBookingByVenueManagerId,
  getBookingByVenueManagerIdPending
} = require('../controllers/booking.controller');
const { protect, venueManagerProtect } = require('../../User/middleware/authMiddleware');

const bookingRouter = express.Router();

bookingRouter.post('/', createBooking)
bookingRouter.get('/', getAllBookings)
bookingRouter.get('/:id', getBookingById)
bookingRouter.get('/venue/:id', getBookingByVenueId)
bookingRouter.get('/organizer/:id', getBookingByOrganizerId)
bookingRouter.put('/:id', updateBookingById)
bookingRouter.delete('/:id', deleteBookingById)
bookingRouter.get('/manager/:id', protect, venueManagerProtect, getBookingByVenueManagerId)
bookingRouter.get('/manager/:id/pending', protect, venueManagerProtect, getBookingByVenueManagerIdPending)

module.exports = bookingRouter;
