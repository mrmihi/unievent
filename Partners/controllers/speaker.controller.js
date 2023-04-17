const SpeakerService = require('../services/speaker.service.js');
//get all speakers
const getSpeakers = async (req, res) => {
  const response = await SpeakerService.getSpeakers();
  res.json(response);
};

//get Event Specific Speakers
const getEventSpecificSpeakers = async (req, res) => {
  const eventID = req.params.id;
  const response = await SpeakerService.getEventSpecificSpeakers(eventID);
  res.json(response);
};

//add a speaker
const addASpeaker = async (req, res) => {
  const response = await SpeakerService.addASpeaker(req.body);
  res.json(response);
};

//update submitted speaker details
const updateSpeakerDetails = async (req, res) => {
  // const {
  //   fullName,
  //   email,
  //   contactNo,
  //   availableTime,
  //   status,
  //   userID,
  //   opportunityID,
  // } = req.body;

  const response = await SpeakerService.updateSpeakerDetails(
    req.params.id,
    req.body
  );
  res.json(response);
};

//delete speaker application
const deleteSpeaker = async (req, res) => {
  const response = await SpeakerService.deleteSpeaker(req.params.id);
  res.json(response);
};

module.exports = {
  addASpeaker,
  getSpeakers,
  getEventSpecificSpeakers,
  updateSpeakerDetails,
  deleteSpeaker,
};
