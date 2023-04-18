const router = require('express').Router();
const eventsRouter = require('./events.routes');
const approvalRouter = require('./approval.routes');

router.use('/events', eventsRouter);
router.use('/approval', approvalRouter);

module.exports = router;
