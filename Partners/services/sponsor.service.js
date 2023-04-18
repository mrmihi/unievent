const SponsorModel = require('../models/sponsor.model');

const getSponsors = async () => {
  try {
    const sponsors = await SponsorModel.find({});

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
    const sponsors = await SponsorModel.find({ eventID: eventID });

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
  eventID,
  organizerID,
}) => {
  try {
    const availableSponsor = await SponsorModel.findOne({
      fullName: fullName,
      eventID: eventID,
    });
    if (availableSponsor) {
      return {
        status: 400,
        message: 'Sponsor already exists in the event',
      };
    }
    const sponsor = new SponsorModel({
      fullName: fullName,
      email: email,
      packageType: packageType,
      eventID: eventID,
      organizerID: organizerID,
    });

    const response = await sponsor.save();
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
    const isSponsorAvailable = await SponsorModel.findById(id);
    if (!isSponsorAvailable) {
      return { status: 404, message: `Sponsor with id ${id} not found` };
    }
    const response = await SponsorModel.findByIdAndUpdate(id, body);
    return {
      status: 200,
      data: response,
      message: `Updated the speaker successfully`,
    };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

const deleteSponsor = async (id) => {
  try {
    const sponsorToBeDeleted = await SponsorModel.findById(id);

    if (!sponsorToBeDeleted) {
      return { status: 404, message: `Sponsor with id ${id} not found` };
    } else {
      await SponsorModel.deleteOne({
        _id: sponsorToBeDeleted._id,
      });

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
