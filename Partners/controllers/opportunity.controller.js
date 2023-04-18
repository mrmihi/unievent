const OpportunityServices = require('../services/opportunities.service.js');
const makeResponse = require('../utils/response.js');

//get all opportunities for a specific event
const getOpportunities = async (req, res) => {
  const eventID = req.params.id;
  const result = await OpportunityServices.getOpportunities(eventID);
  return makeResponse({
    res,
    ...result,
  });
};

//add an opportunity
const createAnOpportunity = async (req, res) => {
  const result = await OpportunityServices.createOpportunity(req.body);

  return makeResponse({
    res,
    ...result,
  });
};

module.exports = { getOpportunities, createAnOpportunity };
