const router = require('express').Router();

const venueRouter = require('./venue.routes');
const reviewRouter = require('./review.routes');
const bookingRouter = require('./booking.routes');

router.use('/venues', venueRouter);
router.use('/reviews', reviewRouter);
router.use('/bookings', bookingRouter);

module.exports = router;
