const VolunteerModel = require('../models/volunteer.model.js');

const getVolunteers = async () => {
  try {
    const volunteers = await VolunteerModel.find({});
    if (!volunteers) {
      return {
        status: 400,

        message: 'Failed to retrieve Volunteers',
      };
    }
    if (volunteers.length === 0) {
      return { status: 400, message: 'No volunteers available' };
    }
    return {
      status: 200,
      data: volunteers,
      message: 'Retrieved all volunteers successfully',
    };
  } catch (error) {
    return { status: 400, message: error.message };
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
  try {
    const availableVolunteer = await VolunteerModel.findOne({
      userID: userID,
      opportunityID: opportunityID,
    });
    if (availableVolunteer) {
      return {
        status: 400,

        message: 'Volunteer already has applied to the opportunity',
      };
    }
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

    return {
      status: 200,
      data: response,
      message: 'Updated the volunteer application successfully',
    };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

const updateVolunteerApplication = async (id, body) => {
  try {
    const isApplicationAvailable = await VolunteerModel.findById(id);

    if (!isApplicationAvailable) {
      return { status: 404, message: `Volunteer with id ${id} not found` };
    }

    const response = await VolunteerModel.findByIdAndUpdate(id, body);

    return {
      status: 200,
      data: response,
      message: `Updated Volunteer application successfully`,
    };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

const deleteVolunteerApplication = async (id) => {
  try {
    const volunteerToBeDeleted = await VolunteerModel.findById(id);

    if (!volunteerToBeDeleted) {
      return { status: 404, message: `Volunteer with id ${id} not found` };
    } else {
      await VolunteerModel.deleteOne({
        _id: volunteerToBeDeleted._id,
      });

      return {
        status: 200,
        message: 'Deleted volunteer application successfully',
      };
    }
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

module.exports = {
  getVolunteers,
  applyToAnOpportunity,
  updateVolunteerApplication,
  deleteVolunteerApplication,
};
