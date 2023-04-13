const router = require('express').Router();
const eventsRouter = require('./events.routes');

router.use('/events', eventsRouter);

module.exports = router;
