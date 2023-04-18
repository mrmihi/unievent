const express = require('express');
const {
  addASponsor,
  deleteSponsor,
  getEventSpecificSponsors,
  getSponsors,
  updateSponsorDetails,
} = require('../controllers/sponsor.controller.js');

const sponsorRouter = express.Router();

//get all volunteers

//register as an volunteer
sponsorRouter.get('/', getSponsors);
sponsorRouter.get('/:id', getEventSpecificSponsors);
sponsorRouter.post('/', addASponsor);
sponsorRouter.put('/:id', updateSponsorDetails);
sponsorRouter.delete('/:id', deleteSponsor);

module.exports = sponsorRouter;
