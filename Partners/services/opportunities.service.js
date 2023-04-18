const OpportunityModel = require('../models/opportunity.model.js');

const getOpportunities = async (eventID) => {
  try {
    const opportunities = await OpportunityModel.find({ eventID: eventID });
    return {
      status: 200,
      data: opportunities,
      message: 'Retrieved all opportunities successfully',
    };
  } catch (error) {
    return { status: 400, message: error.message };
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
    return {
      status: 200,
      data: response,
      message: 'Created the opportunity successfully',
    };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

module.exports = { getOpportunities, createOpportunity };
