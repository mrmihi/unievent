const OpportunitiesRepository = require('../repository/opportunities.repository.js');

const getOpportunities = async (eventID) => {
  try {
    const opportunities = await OpportunitiesRepository.getOpportunities(
      eventID
    );
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
  try {
    const response = await OpportunitiesRepository.createOpportunity({
      name: name,
      description: description,
      date: date,
      time: time,
      eventID: eventID,
    });
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
