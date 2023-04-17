const router = require('express').Router();

const venueRouter = require('./venue.routes');
const reviewRouter = require('./review.routes');
const bookingRouter = require('./booking.routes');

router.use('/venue', venueRouter);
router.use('/review', reviewRouter);
router.use('/booking', bookingRouter);

module.exports = router;
