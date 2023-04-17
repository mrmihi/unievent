const SponsorModel = require('../models/sponsor.model');

const getSponsors = async () => {
  try {
    const sponsors = await SponsorModel.find({});
    console.log(sponsors);
    return sponsors;
  } catch (error) {
    return error;
  }
};

const getEventSpecificSponsors = async (eventID) => {
  try {
    const sponsors = await SponsorModel.find({ eventID: eventID });
    return sponsors;
  } catch (error) {
    return error;
  }
};

const addASponsor = async ({
  fullName,
  packageType,
  email,
  eventID,
  organizerID,
}) => {
  const availableSponsor = await SponsorModel.findOne({ fullName: fullName });
  if (availableSponsor) {
    if (availableSponsor.eventID == eventID) {
      return 'Sponsor Already Exists For the Event';
    }
  } else {
    const sponsor = new SponsorModel({
      fullName: fullName,
      email: email,
      packageType: packageType,
      eventID: eventID,
      organizerID: organizerID,
    });

    try {
      const response = await sponsor.save();
      return response;
    } catch (error) {
      return error;
    }
  }
};

const updateSponsorDetails = async ({ id, body }) => {
  try {
    const sponsorToBeUpdated = await SponsorModel.findByIdAndUpdate(id, body);
    if (!sponsorToBeUpdated) {
      console.log('not found');
    }
    return 'Updated the Form';
  } catch (error) {
    return error;
  }
};

const deleteSponsor = async (id) => {
  try {
    const sponsorToBeDeleted = await SponsorModel.findById(id);

    await SponsorModel.deleteOne({
      _id: sponsorToBeDeleted._id,
    });

    return 'Sponsor Deleted';
  } catch (error) {
    return error;
  }
};

module.exports = {
  getSponsors,
  getEventSpecificSponsors,
  addASponsor,
  updateSponsorDetails,
  deleteSponsor,
};
