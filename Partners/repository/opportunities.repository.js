const OpportunityModel = require('../models/opportunity.model.js');

const getOpportunities = async (eventID) => {
  const opportunities = await OpportunityModel.find({ eventID: eventID });
  return opportunities;
};

const createOpportunity = async ({
  name,
  description,
  date,
  time,
  eventID,
}) => {
  const opportunity = new OpportunityModel({
    name: name,
    description: description,
    date: date,
    time: time,
    eventID: eventID,
  });
  const response = await opportunity.save();
  return response;
};

module.exports = { getOpportunities, createOpportunity };
