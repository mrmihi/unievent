const Reservation = require('../models/reservation.model');
const Venue = require('../../Venue/models/venue.model');

const createReservation = async (req, res) => {
  try {
    const newReservation = await Reservation.create(req.body);
    res.status(201).json(newReservation);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllReservations = async (req, res) => {
  try {
    const Reservations = await Reservation.find({}).populate('resource').populate('event');
    res.status(200).json(Reservations);
  } catch (error) {
    res.status(500).json(error);
  }
};
const getReservationById = async (req, res) => {
  try {
    const Reservation = await Reservation.findById(req.params.id);
    res.status(200).json(Reservation);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getReservationByResourceId = async (req, res) => {
  try {
    const Reservations = await Reservation.find({ resource: req.params.id });
    res.status(200).json(Reservations);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getReservationByOrganizerId = async (req, res) => {
  try {
    const Reservations = await Reservation.find({ organizer: req.params.id });
    res.status(200).json(Reservations);
  } catch (error) {
    res.status(500).json(error);
  }
};

// const updateReservationById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const Reservation = await Reservation.findByIdAndUpdate(
//       { _id: id },
//       req.body,
//       {
//         new: true,
//         runValidators: true,
//       }
//     );
//     res.status(200).json(Reservation);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

const  updateReservationById = async (req, res) => {
  const resource = req.body;
  const id = req.params.id;

  const updatedResource = await Reservation.findByIdAndUpdate(id, resource, {
    new: true,
  });

  updatedResource
    ? res.status(200).json(updatedResource.toJSON())
    : res.status(404).end();
};

// const deleteReservationById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const Reservation = await Reservation.findByIdAndDelete({ _id: id });
//     if (!Reservation) {
//       res.status(404).json({ message: 'Reservation not found' });
//     }
//     res.status(200).json(Reservation);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

const deleteReservationById = async (req, res) => {
  const id = req.params.id;
  const resource = await Reservation.findById(id);
  await resource.deleteOne({ _id: id });
  res.sendStatus(204).end();
};

const getReservationByResourceManagerId = async (req, res) => {
  try {
    const venues = await Venue.find({ manager: req.user._id });
    const Reservation = await Reservation.find({
      venue: { $in: venues.map((v) => v._id) },
    })
      .populate('venue')
      .populate('organizer')
      .populate('event');
    res.status(200).json(Reservation);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getReservationByResourceManagerIdPending = async (req, res) => {
  try {
    const venues = await Venue.find({ manager: req.user._id });
    const Reservation = await Reservation.find({
      venue: { $in: venues.map((v) => v._id) },
      Reservation_status: 'pending',
    })
      .populate('venue')
      .populate('organizer')
      .populate('event');
    res.status(200).json(Reservation);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getReservationByEventId = async (req, res) => {
  try {
    const Reservations = await Reservation.find({
      event: req.params.id,
    }).populate('venue');
    res.status(200).json(Reservations);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createReservation,
  getAllReservations,
  getReservationById,
  getReservationByResourceId,
  getReservationByOrganizerId,
  updateReservationById,
  deleteReservationById,
  getReservationByResourceManagerId,
  getReservationByResourceManagerIdPending,
  getReservationByEventId,
};
