const express = require('express');

const bookingRouter = express.Router();

bookingRouter.get('/info', (req, res) => {
  res.json('Booking Router');
});

// bookingRouter.post('/', createBooking)
// bookingRouter.get('/', getAllBookings)
// bookingRouter.get('/:id', getBookingById)
// bookingRouter.get('/venue/:id', getBookingByVenueId)
// bookingRouter.get('/organizer/:id', getBookingByOrganizerId)
// bookingRouter.put('/:id', updateBookingById)
// bookingRouter.delete('/:id', deleteBookingById)

module.exports = bookingRouter;
