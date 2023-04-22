const speakerModel = require('../models/speaker.model.js');
const SpeakerModel = require('../models/speaker.model.js');

const getSpeakers = async () => {
  const speakers = await SpeakerModel.find({});
  return speakers;
};

const getEventSpecificSpeakers = async (eventID) => {
  const speakers = await SpeakerModel.find({ eventID: eventID });
  return speakers;
};

const checkIfSpeakerExists = async ({ fullName, eventID }) => {
  const availableSpeaker = await SpeakerModel.findOne({
    fullName: fullName,
    eventID: eventID,
  });
  return availableSpeaker;
};

const checkIfSpeakerExistsById = async (id) => {
  const availableSpeaker = await SpeakerModel.findById(id);
  return availableSpeaker;
};

const addASpeaker = async (
  fullName,
  sessionTime,
  email,
  contactNo,
  speakerImage,
  eventID,
  organizationID
) => {
  const speaker = new SpeakerModel({
    fullName: fullName,
    sessionTime: sessionTime,
    email: email,
    contactNo: contactNo,
    speakerImage: speakerImage,
    eventID: eventID,
    organizationID: organizationID,
  });

  const response = await speaker.save();
  return response;
};

const updateSpeaker = async (id, body) => {
  const response = await speakerModel.findByIdAndUpdate(id, body, {
    new: true,
  });
  return response;
};

const deleteSpeaker = async (id) => {
  await SpeakerModel.deleteOne({
    _id: id,
  });
};

module.exports = {
  getSpeakers,
  getEventSpecificSpeakers,
  checkIfSpeakerExists,
  addASpeaker,
  updateSpeaker,
  checkIfSpeakerExistsById,
  deleteSpeaker,
};
