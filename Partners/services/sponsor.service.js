const SponsorRepository = require('../repository/sponsor.repository.js');

const getSponsors = async () => {
  try {
    const sponsors = await SponsorRepository.getSponsors();

    if (!sponsors) {
      return {
        status: 400,

        message: 'Failed to retrieve sponsors',
      };
    }
    if (sponsors.length === 0) {
      return { status: 400, message: 'No sponsors available' };
    }

    return {
      status: 200,
      data: sponsors,
      message: 'Retrieved all sponsors successfully',
    };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

const getEventSpecificSponsors = async (eventID) => {
  try {
    const sponsors = await SponsorRepository.getEventSpecificSponsors(eventID);

    if (sponsors.length === 0) {
      return { status: 400, message: 'No sponsors available' };
    }

    return {
      status: 200,
      data: sponsors,
      message: 'Retrieved all event specific sponsors successfully',
    };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

const addASponsor = async ({
  fullName,
  packageType,
  email,
  sponsorImage,
  eventID,
  organizationID,
}) => {
  try {
    const availableSponsor = await SponsorRepository.checkIfSponsorExists({
      fullName,
      eventID,
    });
    if (availableSponsor) {
      return {
        status: 400,
        message: 'Sponsor already exists in the event',
      };
    }
    const response = await SponsorRepository.addASponsor(
      fullName,
      packageType,
      email,
      sponsorImage,
      eventID,
      organizationID
    );

    return {
      status: 200,
      data: response,
      message: 'Added the sponsor to the event successfully',
    };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

const updateSponsorDetails = async (id, body) => {
  try {
    const isSponsorAvailable = await SponsorRepository.checkIfSponsorExistsById(
      id
    );
    if (!isSponsorAvailable) {
      return { status: 404, message: `Sponsor with id ${id} not found` };
    }
    const response = await SponsorRepository.updateSponsor(id, body);
    return {
      status: 200,
      data: response,
      message: "Updated the Sponsor successfully",
    };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

const deleteSponsor = async (id) => {
  try {
    const sponsorToBeDeleted = await SponsorRepository.checkIfSponsorExistsById(
      id
    );

    if (!sponsorToBeDeleted) {
      return { status: 404, message: `Sponsor with id ${id} not found` };
    } else {
      await SponsorRepository.deleteSponsor(sponsorToBeDeleted._id);

      return {
        status: 200,
        message: 'Deleted the Sponsor successfully',
      };
    }
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

module.exports = {
  getSponsors,
  getEventSpecificSponsors,
  addASponsor,
  updateSponsorDetails,
  deleteSponsor,
};
