const opportunityRouter = require('../routes/opportunities.routes');
const speakerRouter = require('../routes/speaker.routes');
const sponsorRouter = require('../routes/sponsor.routes');
const volunteerRouter = require('../routes/volunteer.routes');
const partnerRouter = require('express').Router();
partnerRouter.use('/opportunities', opportunityRouter);
partnerRouter.use('/volunteers', volunteerRouter);
partnerRouter.use('/sponsors', sponsorRouter);
partnerRouter.use('/speakers', speakerRouter);

module.exports = partnerRouter;
