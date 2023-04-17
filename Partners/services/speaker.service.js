const SpeakerModel = require('../models/speaker.model.js');

const getSpeakers = async () => {
  try {
    const speakers = await SpeakerModel.find({});
    return speakers;
  } catch (error) {
    return error;
  }
};

const getEventSpecificSpeakers = async (eventID) => {
  try {
    const speakers = await SpeakerModel.find({ eventID: eventID });
    return speakers;
  } catch (error) {
    return error;
  }
};

const addASpeaker = async ({
  fullName,
  sessionTime,
  email,
  contactNo,
  eventID,
  organizerID,
}) => {
  const availableSpeaker = await SpeakerModel.findOne({ fullName: fullName });
  if (availableSpeaker) {
    if (availableSpeaker.eventID == eventID) {
      return "'Speaker Already Exists For the Event'";
    }
  } else {
    const speaker = new SpeakerModel({
      fullName: fullName,
      sessionTime: sessionTime,
      email: email,
      contactNo: contactNo,
      eventID: eventID,
      organizerID: organizerID,
    });

    try {
      const response = await speaker.save();
      return response;
    } catch (error) {
      return error;
    }
  }
};

const updateSpeakerDetails = async ({ id, body }) => {
  try {
    const speakerToBeUpdated = await SpeakerModel.findByIdAndUpdate(id, body);
    if (!speakerToBeUpdated) {
      console.log('not found');
    }
    return 'Updated the Form';
  } catch (error) {
    return error;
  }
};

const deleteSpeaker = async (id) => {
  try {
    const speakerToBeDeleted = await SpeakerModel.findById(id);

    await SpeakerModel.deleteOne({
      _id: speakerToBeDeleted._id,
    });

    return 'speaker Deleted';
  } catch (error) {
    return error;
  }
};

module.exports = {
  getSpeakers,
  getEventSpecificSpeakers,
  addASpeaker,
  updateSpeakerDetails,
  deleteSpeaker,
};
