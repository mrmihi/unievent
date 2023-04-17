const OpportunityServices = require('../services/opportunities.service.js');

//get all opportunities for a specific event
const getOpportunities = async (req, res) => {
  const eventID = req.params.id;
  const response = await OpportunityServices.getOpportunities(eventID);
  res.json(response);
};

//add an opportunity
const createAnOpportunity = async (req, res) => {
  const response = await OpportunityServices.createOpportunity(req.body);

  res.json(response);
};

module.exports = { getOpportunities, createAnOpportunity };
