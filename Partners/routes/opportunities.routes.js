const express = require('express');
const {
  createAnOpportunity,
  getOpportunities,
} = require('../controllers/opportunity.controller.js');

const opportunityRouter = express.Router();

//get all the opportunities
opportunityRouter.get('/:id', getOpportunities);

//create an opportunity
opportunityRouter.post('/', createAnOpportunity);

module.exports = opportunityRouter;
