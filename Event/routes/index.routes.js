const router = require('express').Router();
const usersRouter = require('./users.routes');
const eventsRouter = require('./events.routes');
const loginRouter = require('../controllers/login.controller');

router.use('/api/events', eventsRouter);
router.use('/api/users', usersRouter);
router.use('/api/login', loginRouter);

module.exports = router;
