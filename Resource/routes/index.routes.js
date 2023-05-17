const router = require('express').Router();
const resourceRouter = require('./resource.routes');
const reservationRouter = require('./reservation.routes');

router.use('/resources', resourceRouter);
router.use('/reservations', reservationRouter);

module.exports = router;
