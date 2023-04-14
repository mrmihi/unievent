const router = require('express').Router();
const usersRouter = require('./users.routes');
const eventsRouter = require('./events.routes');

router.use('/events', eventsRouter);
router.use('/users', usersRouter);

module.exports = router;
