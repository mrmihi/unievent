const SponsorServices = require('../services/sponsor.service');
const makeResponse = require('../utils/response');

//get all sponsors
const getSponsors = async (req, res) => {
  const result = await SponsorServices.getSponsors();
  return makeResponse({
    res,
    ...result,
  });
};

//get Event Specific Sponsors
const getEventSpecificSponsors = async (req, res) => {
  const eventID = req.params.id;
  const result = await SponsorServices.getEventSpecificSponsors(eventID);
  return makeResponse({
    res,
    ...result,
  });
};

//add a sponsor
const addASponsor = async (req, res) => {
  const result = await SponsorServices.addASponsor(req.body);
  return makeResponse({
    res,
    ...result,
  });
};

//update submitted sponsor details
const updateSponsorDetails = async (req, res) => {
  const result = await SponsorServices.updateSponsorDetails(
    req.params.id,
    req.body
  );
  return makeResponse({
    res,
    ...result,
  });
};

//delete sponsor application
const deleteSponsor = async (req, res) => {
  const result = await SponsorServices.deleteSponsor(req.params.id);
  return makeResponse({
    res,
    ...result,
  });
};

module.exports = {
  addASponsor,
  getSponsors,
  getEventSpecificSponsors,
  updateSponsorDetails,
  deleteSponsor,
};
