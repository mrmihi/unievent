const SpeakerRepository = require('../repository/speaker.repository.js');

const getSpeakers = async () => {
  try {
    const speakers = await SpeakerRepository.getSpeakers();
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
    const speakers = await SpeakerRepository.getEventSpecificSpeakers(eventID);
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
  speakerImage,
  eventID,
  organizationID,
}) => {
  try {
    const availableSpeaker = await SpeakerRepository.checkIfSpeakerExists({
      fullName,
      eventID,
    });

    if (availableSpeaker) {
      return {
        status: 400,
        message: 'Speaker already exists in the event',
      };
    }
    const response = await SpeakerRepository.addASpeaker(
      fullName,
      sessionTime,
      email,
      contactNo,
      speakerImage,
      eventID,
      organizationID
    );

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
    const isSpeakerAvailable = await SpeakerRepository.checkIfSpeakerExistsById(
      id
    );

    if (!isSpeakerAvailable) {
      return { status: 404, message: `Speaker with id ${id} not found` };
    }

    const response = await SpeakerRepository.updateSpeaker(id, body);
    return {
      status: 200,
      data: response,
      message: "Updated the speaker successfully",
    };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

const deleteSpeaker = async (id) => {
  try {
    const speakerToBeDeleted = await SpeakerRepository.checkIfSpeakerExistsById(
      id
    );
    if (!speakerToBeDeleted) {
      return { status: 404, message: `Speaker with id ${id} not found` };
    } else {
      await SpeakerRepository.deleteSpeaker(speakerToBeDeleted._id);

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
