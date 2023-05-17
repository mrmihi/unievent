const router = require('express').Router();
const resourceRouter = require('./resource.routes');

router.use('/resources', resourceRouter);

module.exports = router;
