const VolunteerModel = require('../models/volunteer.model.js');

const getVolunteers = async () => {
  const volunteers = await VolunteerModel.find({});
  return volunteers;
};

const getRegisteredOpportunitiesByUserID = async (userID) => {
  const opportunities = await VolunteerModel.find({ userID: userID });
  return opportunities;
};

const updateApplicationStatus = async (id, value) => {
  const response = await VolunteerModel.findByIdAndUpdate(
    id,
    { $set: { status: value } },
    { new: true }
  );
  return response;
};

const applyToAnOpportunity = async (
  fullName,
  email,
  contactNo,
  availableTime,
  status,
  userID,
  opportunityID
) => {
  const volunteer = new VolunteerModel({
    fullName: fullName,
    email: email,
    contactNo: contactNo,
    availableTime: availableTime,
    status: status,
    userID: userID,
    opportunityID: opportunityID,
  });
  const response = await volunteer.save();
  return response;
};

const checkIfVolunteerExists = async (userID, opportunityID) => {
  const availableVolunteer = await VolunteerModel.findOne({
    userID: userID,
    opportunityID: opportunityID,
  });
  return availableVolunteer;
};

const checkIfVolunteerExistsById = async (id) => {
  const availableVolunteer = await VolunteerModel.findById(id);
  return availableVolunteer;
};

const updateApplication = async (id, body) => {
  const response = await VolunteerModel.findByIdAndUpdate(id, body, {
    new: true,
  });
  return response;
};

const deleteApplication = async (id) => {
  await VolunteerModel.deleteOne({
    _id: id,
  });
};

module.exports = {
  getVolunteers,
  applyToAnOpportunity,
  checkIfVolunteerExists,
  checkIfVolunteerExistsById,
  getRegisteredOpportunitiesByUserID,
  updateApplicationStatus,
  updateApplication,
  deleteApplication,
};
