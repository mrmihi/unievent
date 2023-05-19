const Event = require('../models/event.model');
const validateRequest = require('../middleware/requestValidator');

// This function is not complete
const createEvent = async ({
  name,
  description,
  headerImage,
  venue,
  startTime,
  endTime,
  status,
  category,
  speakers,
  capacity,
  tags,
  joinLink,
  host,
  org,
  orgId,
}) =>
  // Org
  {
    // const cId = Org._id;
    // console.log('cId : ', cId);
    const event = new Event({
      name,
      description,
      headerImage,
      venue,
      startTime,
      endTime,
      status,
      category,
      speakers,
      capacity,
      tags,
      host,
      joinLink,
      org,
      orgId,
    });

    return event.save();
  };

/**
 *
 * @param id
 * @returns {Query<Document | null, Document>}
 */
const getEventById = (id) => Event.findById(id);

/**
 *
 * @param id
 * @param body
 * @param user
 * @returns {Query<Document | null, Document>}
 */
const updateEventById = async (id, body, user) => {
  const event = await Event.findById(id);
  validateRequest(
    event,
    user,
    'You can only make changes to events published by your faculty'
  );
  return await Event.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: false,
  });
};
const deleteEventById = async () => {};

module.exports = {
  createEvent,
  getEventById,
  updateEventById,
  deleteEventById,
};
