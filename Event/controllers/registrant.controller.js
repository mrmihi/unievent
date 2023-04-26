const Registrant = require('../models/registrant.model');
const Event = require('../models/event.model');
const EventService = require('../services/event.service');
// CREATE operation
async function createRegistrant(req, res) {
  try {
    const registrant = new Registrant(req.body);
    const savedRegistrant = await registrant.save();
    // const event = await EventService.getEventById(req.body.eventId);
    Event.updateOne({ _id: req.body.eventId }, { $inc: { attendeeCount: 1 } })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });

    res.json(savedRegistrant.toJSON());
  } catch (err) {
    throw new Error(`Error creating registrant: ${err.message}`);
  }
}

const getRegistrantById = async (req, res) => {
  const registrants = await Registrant.findById(req.params.id);
  res.json(registrants);
};

const getAllRegistrants = async (req, res) => {
  const registrants = await Registrant.find({});
  res.json(registrants);
};

const updateRegistrantById = async (req, res) => {
  const registrant = req.body;
  const id = req.params.id;

  const updatedRegistrant = await Registrant.findByIdAndUpdate(id, registrant, {
    new: true,
  });

  updatedRegistrant
    ? res.status(200).json(updatedRegistrant.toJSON())
    : res.status(404).end();
};

const deleteRegistrantById = async (req, res) => {
  const id = req.params.id;
  const registrant = await Registrant.findById(id);
  await registrant.deleteOne({ _id: id });
  res.sendStatus(204).end();
};

module.exports = {
  createRegistrant,
  getRegistrantById,
  getAllRegistrants,
  updateRegistrantById,
  deleteRegistrantById,
};
