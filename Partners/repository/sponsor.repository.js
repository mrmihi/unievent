const SponsorModel = require('../models/sponsor.model');

const getSponsors = async () => {
  const sponsors = await SponsorModel.find({});
  return sponsors;
};

const getEventSpecificSponsors = async (eventID) => {
  const sponsors = await SponsorModel.find({ eventID: eventID });
  return sponsors;
};

const addASponsor = async (
  fullName,
  packageType,
  email,
  sponsorImage,
  eventID,
  organizationID
) => {
  const sponsor = new SponsorModel({
    fullName: fullName,
    email: email,
    packageType: packageType,
    sponsorImage: sponsorImage,
    eventID: eventID,
    organizationID: organizationID,
  });
  const response = await sponsor.save();
  return response;
};

const checkIfSponsorExists = async ({ fullName, eventID }) => {
  const availableSponsor = await SponsorModel.findOne({
    fullName: fullName,
    eventID: eventID,
  });
  return availableSponsor;
};

const checkIfSponsorExistsById = async (id) => {
  const isSponsorAvailable = await SponsorModel.findById(id);
  return isSponsorAvailable;
};

const updateSponsor = async (id, body) => {
  const response = await SponsorModel.findByIdAndUpdate(id, body, {
    new: true,
  });
  return response;
};

const deleteSponsor = async (id) => {
  await SponsorModel.deleteOne({
    _id: id,
  });
};

module.exports = {
  getSponsors,
  getEventSpecificSponsors,
  addASponsor,
  checkIfSponsorExists,
  checkIfSponsorExistsById,
  updateSponsor,
  deleteSponsor,
};
