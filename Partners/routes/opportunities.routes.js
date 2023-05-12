const express = require('express');
const {
  createAnOpportunity,
  getOpportunities,
  getDetails,
  updateAnOpportunity,
  deleteAnOpportunity,
} = require('../controllers/opportunity.controller.js');

const opportunityRouter = express.Router();

//get all the opportunities
opportunityRouter.get('/:id', getOpportunities);

//create an opportunity
opportunityRouter.post('/', createAnOpportunity);
opportunityRouter.get('/opportunity/:id', getDetails);
opportunityRouter.put('/:id', updateAnOpportunity);
opportunityRouter.delete('/:id', deleteAnOpportunity);

module.exports = opportunityRouter;
