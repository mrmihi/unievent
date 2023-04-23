const router = require('express').Router();
const approvalRouter = require('./approval.routes');

router.use('/approval', approvalRouter);

module.exports = router;
