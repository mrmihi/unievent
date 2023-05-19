const VolunteerRepository = require('../repository/volunteer.repository.js');

const getVolunteers = async () => {
  try {
    const volunteers = await VolunteerRepository.getVolunteers();
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

const getRegisteredOpportunitiesByUserID = async (userID) => {
  try {
    const opportunities =
      await VolunteerRepository.getRegisteredOpportunitiesByUserID(userID);
    if (!opportunities) {
      return {
        status: 400,

        message: 'Failed to retrieve opportunities',
      };
    }
    if (opportunities.length === 0) {
      return { status: 400, message: 'No opportunities available' };
    }
    return {
      status: 200,
      data: opportunities,
      message: 'Retrieved all opportunities successfully',
    };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

const updateApplicationStatus = async (id, value) => {
  try {
    const result = await VolunteerRepository.updateApplicationStatus(id, value);
    if (!result) {
      return {
        status: 400,

        message: 'Failed to update status',
      };
    }
    return {
      status: 200,
      data: result,
      message: 'Update the Status',
    };
  } catch (error) {
    console.log(error);
  }
};

const applyToAnOpportunity = async (
  opportunityID,
  { fullName, email, contactNo, availableTime, status, userID }
) => {
  try {
    const availableVolunteer = await VolunteerRepository.checkIfVolunteerExists(
      userID,
      opportunityID
    );
    if (availableVolunteer) {
      return {
        status: 400,

        message: 'Volunteer already has applied to the opportunity',
      };
    }
    const response = await VolunteerRepository.applyToAnOpportunity(
      fullName,
      email,
      contactNo,
      availableTime,
      status,
      userID,
      opportunityID
    );

    return {
      status: 200,
      data: response,
      message: 'Added the volunteer application successfully',
    };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

const updateVolunteerApplication = async (id, body) => {
  try {
    const isApplicationAvailable =
      await VolunteerRepository.checkIfVolunteerExistsById(id);

    if (!isApplicationAvailable) {
      return { status: 404, message: `Volunteer with id ${id} not found` };
    }

    const response = await VolunteerRepository.updateApplication(id, body);

    return {
      status: 200,
      data: response,
      message: "Updated Volunteer application successfully",
    };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

const deleteVolunteerApplication = async (id) => {
  try {
    const volunteerToBeDeleted =
      await VolunteerRepository.checkIfVolunteerExistsById(id);

    if (!volunteerToBeDeleted) {
      return { status: 404, message: `Volunteer with id ${id} not found` };
    } else {
      await VolunteerRepository.deleteApplication({
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
  updateApplicationStatus,
  getRegisteredOpportunitiesByUserID,
  deleteVolunteerApplication,
};
