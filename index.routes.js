const express = require('express');

const routes = express.Router();

const eventsRouter = require('./Event/routes/index.routes');
const venueRouter = require('./Venue/routes/index.routes');
const attendeeRouter = require('./Attendee/routes/index.routes.js');
const userRouter = require('./User/routes/index.routes');
const resourceRouter = require('./Resource/routes/index.routes');

const financeRouter = require('./Finance/routes/index.routes');
const budgetRouter = require('./Budget/routes/index.routes');
const approvalRouter = require('./Approval/routes/index.routes');
const partnerRouter = require('./Partners/routes/index.routes');

routes.use('/', eventsRouter);
routes.use('/', venueRouter);
routes.use('/', userRouter);
routes.use('/', resourceRouter);
routes.use('/', financeRouter);
routes.use('/', budgetRouter);
routes.use('/', approvalRouter);
routes.use('/partners', partnerRouter);
routes.use('/', attendeeRouter);

module.exports = routes;
