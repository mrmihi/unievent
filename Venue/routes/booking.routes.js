const express = require('express');

const { 
  createBooking, 
  getAllBookings, 
  getBookingById,
  getBookingByVenueId,
  getBookingByOrganizerId,
  updateBookingById,
  deleteBookingById
} = require('../controllers/booking.controller');

const bookingRouter = express.Router();

bookingRouter.post('/', createBooking)
bookingRouter.get('/', getAllBookings)
bookingRouter.get('/:id', getBookingById)
bookingRouter.get('/venue/:id', getBookingByVenueId)
bookingRouter.get('/organizer/:id', getBookingByOrganizerId)
bookingRouter.put('/:id', updateBookingById)
bookingRouter.delete('/:id', deleteBookingById)

module.exports = bookingRouter;
