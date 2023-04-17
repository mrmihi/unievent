const router = require('express').Router();
const usersRouter = require('./users.routes');
const eventsRouter = require('./events.routes');
const loginRouter = require('../controllers/login.controller');

router.use('/events', eventsRouter);
router.use('/users', usersRouter);
router.use('/login', loginRouter);

module.exports = router;
