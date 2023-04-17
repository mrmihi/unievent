const OpportunityModel = require('../models/opportunity.model.js');

const getOpportunities = async (eventID) => {
  try {
    const opportunities = await OpportunityModel.find({ eventID: eventID });
    return opportunities;
  } catch (error) {
    return error;
  }
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
  try {
    const response = await opportunity.save();
    return response;
  } catch (error) {
    return error;
  }
};

module.exports = { getOpportunities, createOpportunity };
