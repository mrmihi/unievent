const router = require('express').Router();

const venueRouter = require('./venue.routes');
const reviewRouter = require('./review.routes');

router.use('/venue', venueRouter);
router.use('/review', reviewRouter);

module.exports = router;
