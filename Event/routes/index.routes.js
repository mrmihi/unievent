const router = require('express').Router();
const usersRouter = require('./users.routes');
const eventsRouter = require('./events.routes');
const loginRouter = require('../controllers/login.controller');
const registrantRouter = require('./registrant.routes');

router.use('/events', eventsRouter);
router.use('/registrants', registrantRouter);

module.exports = router;
