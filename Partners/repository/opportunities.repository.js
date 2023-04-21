const opportunityModel = require('../models/opportunity.model.js');
const OpportunityModel = require('../models/opportunity.model.js');

const getOpportunities = async (eventID) => {
  const opportunities = await OpportunityModel.find({ eventID: eventID });
  return opportunities;
};

const checkIfOpportunityExists = async ({ fullName, eventID }) => {
  const availableOpportunity = await OpportunityModel.findOne({
    fullName: fullName,
    eventID: eventID,
  });
  return availableOpportunity;
};

const checkIfOpportunityExistsById = async (id) => {
  const availableOpportunity = await OpportunityModel.findById(id);
  return availableOpportunity;
};

const createOpportunity = async ({
  name,
  description,
  date,
  time,
  opportunityImage,
  eventID,
}) => {
  const opportunity = new OpportunityModel({
    name: name,
    description: description,
    date: date,
    time: time,
    opportunityImage: opportunityImage,
    eventID: eventID,
  });
  const response = await opportunity.save();
  return response;
};

const updateOpportunity = async (id, body) => {
  const response = await opportunityModel.findByIdAndUpdate(id, body, {
    new: true,
  });
  return response;
};

const deleteAnOpportunity = async (id) => {
  await OpportunityModel.deleteOne({
    _id: id,
  });
};

module.exports = {
  getOpportunities,
  createOpportunity,
  checkIfOpportunityExists,
  checkIfOpportunityExistsById,
  updateOpportunity,
  deleteAnOpportunity,
};
