const SpeakerModel = require('../models/speaker.model.js');

const getSpeakers = async () => {
  try {
    const speakers = await SpeakerModel.find({});
    if (!speakers) {
      return {
        status: 400,

        message: 'Failed to retrieve speakers',
      };
    }
    if (speakers.length === 0) {
      return { status: 400, message: 'No speakers available' };
    }

    return {
      status: 200,
      data: speakers,
      message: 'Retrieved all speakers successfully',
    };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

const getEventSpecificSpeakers = async (eventID) => {
  try {
    const speakers = await SpeakerModel.find({ eventID: eventID });

    if (speakers.length === 0) {
      return { status: 400, message: 'No speakers available' };
    }

    return {
      status: 200,
      data: speakers,
      message: 'Retrieved all event specific speakers successfully ',
    };
  } catch (error) {
    return { status: 400, message: error.message };
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
  try {
    const availableSpeaker = await SpeakerModel.findOne({
      fullName: fullName,
      eventID: eventID,
    });
    if (availableSpeaker) {
      return {
        status: 400,
        message: 'Speaker already exists in the event',
      };
    }
    const speaker = new SpeakerModel({
      fullName: fullName,
      sessionTime: sessionTime,
      email: email,
      contactNo: contactNo,
      eventID: eventID,
      organizerID: organizerID,
    });

    const response = await speaker.save();
    return {
      status: 200,
      data: response,
      message: 'Added the speaker to the event successfully',
    };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

const updateSpeakerDetails = async (id, body) => {
  try {
    const isSpeakerAvailable = await SpeakerModel.findById(id);

    if (!isSpeakerAvailable) {
      return { status: 404, message: `Speaker with id ${id} not found` };
    }

    const response = await SpeakerModel.findByIdAndUpdate(id, body);
    return {
      status: 200,
      data: response,
      message: `Updated the speaker successfully`,
    };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

const deleteSpeaker = async (id) => {
  try {
    const speakerToBeDeleted = await SpeakerModel.findById(id);
    if (!speakerToBeDeleted) {
      return { status: 404, message: `Speaker with id ${id} not found` };
    } else {
      await SpeakerModel.deleteOne({
        _id: speakerToBeDeleted._id,
      });

      return {
        status: 200,
        message: 'Deleted the Speaker successfully',
      };
    }
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

module.exports = {
  getSpeakers,
  getEventSpecificSpeakers,
  addASpeaker,
  updateSpeakerDetails,
  deleteSpeaker,
};
