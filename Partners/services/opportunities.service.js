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
  opportunityImage,
  eventID,
}) => {
  try {
    const response = await OpportunitiesRepository.createOpportunity({
      name: name,
      description: description,
      date: date,
      time: time,
      opportunityImage: opportunityImage,
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

const getDetails = async (id) => {
  try {
    const details = await OpportunitiesRepository.checkIfOpportunityExistsById(
      id
    );

    if (!details) {
      return { status: 400, message: 'Opportunity Not Found' };
    }

    return {
      status: 200,
      data: details,
      message: 'Retrieved the opportunity details successfully',
    };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

const updateAnOpportunity = async (id, body) => {
  try {
    const isOpportunityAvailable =
      await OpportunitiesRepository.checkIfOpportunityExistsById(id);

    if (!isOpportunityAvailable) {
      return { status: 404, message: `Opportunity with id ${id} not found` };
    }

    const response = await OpportunitiesRepository.updateOpportunity(id, body);
    return {
      status: 200,
      data: response,
      message: "Updated the Opportunity successfully",
    };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

const deleteAnOpportunity = async (id) => {
  try {
    const opportunityToBeDeleted =
      await OpportunitiesRepository.checkIfOpportunityExistsById(id);
    if (!opportunityToBeDeleted) {
      return { status: 404, message: `opportunity with id ${id} not found` };
    } else {
      await OpportunitiesRepository.deleteAnOpportunity(
        opportunityToBeDeleted._id
      );

      return {
        status: 200,
        message: 'Deleted the opportunity successfully',
      };
    }
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

module.exports = {
  getOpportunities,
  createOpportunity,
  getDetails,
  updateAnOpportunity,
  deleteAnOpportunity,
};
