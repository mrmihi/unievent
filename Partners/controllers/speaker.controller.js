const SpeakerService = require('../services/speaker.service.js');
const makeResponse = require('../utils/response.js');
//get all speakers
const getSpeakers = async (req, res) => {
  const result = await SpeakerService.getSpeakers();
  return makeResponse({
    res,
    ...result,
  });
};

//get Event Specific Speakers
const getEventSpecificSpeakers = async (req, res) => {
  const eventID = req.params.id;
  const result = await SpeakerService.getEventSpecificSpeakers(eventID);
  return makeResponse({
    res,
    ...result,
  });
};

//add a speaker
const addASpeaker = async (req, res) => {
  const result = await SpeakerService.addASpeaker(req.body);
  return makeResponse({
    res,
    ...result,
  });
};

//update submitted speaker details
const updateSpeakerDetails = async (req, res) => {
  const result = await SpeakerService.updateSpeakerDetails(
    req.params.id,
    req.body
  );
  return makeResponse({
    res,
    ...result,
  });
};

//delete speaker application
const deleteSpeaker = async (req, res) => {
  const result = await SpeakerService.deleteSpeaker(req.params.id);
  return makeResponse({
    res,
    ...result,
  });
};

module.exports = {
  addASpeaker,
  getSpeakers,
  getEventSpecificSpeakers,
  updateSpeakerDetails,
  deleteSpeaker,
};
