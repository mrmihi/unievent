const SponsorServices = require('../services/sponsor.service');

//get all sponsors
const getSponsors = async (req, res) => {
  const response = await SponsorServices.getSponsors();
  console.log(response);
  res.json(response);
};

//get Event Specific Sponsors
const getEventSpecificSponsors = async (req, res) => {
  const eventID = req.params.id;
  const response = await SponsorServices.getEventSpecificSponsors(eventID);
  res.json(response);
};

//add a sponsor
const addASponsor = async (req, res) => {
  const response = await SponsorServices.addASponsor(req.body);
  res.json(response);
};

//update submitted sponsor details
const updateSponsorDetails = async (req, res) => {
  // const {
  //   fullName,
  //   email,
  //   contactNo,
  //   availableTime,
  //   status,
  //   userID,
  //   opportunityID,
  // } = req.body;
  const response = await SponsorServices.updateSponsorDetails(
    req.params.id,
    req.body
  );
  res.json(response);
};

//delete sponsor application
const deleteSponsor = async (req, res) => {
  const response = await SponsorServices.deleteSponsor(req.params.id);
  res.json(response);
};

module.exports = {
  addASponsor,
  getSponsors,
  getEventSpecificSponsors,
  updateSponsorDetails,
  deleteSponsor,
};
