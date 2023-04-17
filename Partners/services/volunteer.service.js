const VolunteerModel = require('../models/volunteer.model.js');

const getVolunteers = async () => {
  try {
    const volunteers = await VolunteerModel.find({});
    return volunteers;
  } catch (error) {
    return error;
  }
};

const applyToAnOpportunity = async ({
  fullName,
  email,
  contactNo,
  availableTime,
  status,
  userID,
  opportunityID,
}) => {
  const availableVolunteer = await VolunteerModel.findOne({
    fullName: fullName,
  });
  if (availableVolunteer) {
    if (availableVolunteer.opportunityID == opportunityID) {
      return 'Volunteer Already Exists For the Event';
    }
  } else {
    const volunteer = new VolunteerModel({
      fullName: fullName,
      email: email,
      contactNo: contactNo,
      availableTime: availableTime,
      status: status,
      userID: userID,
      opportunityID: opportunityID,
    });

    try {
      const response = await volunteer.save();
      return response;
    } catch (error) {
      return error;
    }
  }
};

const updateVolunteerApplication = async ({ id, body }) => {
  try {
    const applicationToBeUpdate = await VolunteerModel.findByIdAndUpdate(
      id,
      body
    );
    if (!applicationToBeUpdate) {
      console.log('not found');
    }
    return 'Updated the Form';
  } catch (error) {
    return error;
  }
};

const deleteVolunteerApplication = async (id) => {
  try {
    const volunteerToBeDeleted = await VolunteerModel.findById(id);

    await VolunteerModel.deleteOne({
      _id: volunteerToBeDeleted._id,
    });

    return 'Volunteer Deleted';
  } catch (error) {
    return error;
  }
};

module.exports = {
  getVolunteers,
  applyToAnOpportunity,
  updateVolunteerApplication,
  deleteVolunteerApplication,
};
