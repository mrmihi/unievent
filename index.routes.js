const express = require('express');

const routes = express.Router();

const eventsRouter = require('./Event/routes/index.routes');
const venueRouter = require('./Venue/routes/index.routes');
const userRouter = require('./User/routes/index.routes');
const approvalRouter = require('./Approval/routes/index.routes');
const partnerRouter = require('./Partners/routes/index.routes');
    
routes.use('/', eventsRouter);
routes.use('/', venueRouter);
routes.use('/', userRouter);
routes.use('/', approvalRouter);
routes.use('/partners', partnerRouter);

module.exports = routes;