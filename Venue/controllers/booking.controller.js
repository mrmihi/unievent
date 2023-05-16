const Booking = require('../models/booking.model');
const Venue = require('../../Venue/models/venue.model');

const createBooking = async (req, res) => {
  try {
    const newBooking = await Booking.create(req.body);
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({}).populate('venue');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json(error);
  }
};
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getBookingByVenueId = async (req, res) => {
  try {
    const bookings = await Booking.find({ venue: req.params.id });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getBookingByOrganizerId = async (req, res) => {
  try {
    const bookings = await Booking.find({ organizer: req.params.id });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByIdAndDelete({ _id: id });
    if (!booking) {
      res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getBookingByVenueManagerId = async (req, res) => {
  try {
    const venues = await Venue.find({ manager: req.user._id });
    const booking = await Booking.find({
      venue: { $in: venues.map((v) => v._id) },
    })
      .populate('venue')
      .populate('organizer')
      .populate('event');
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getBookingByVenueManagerIdPending = async (req, res) => {
  try {
    const venues = await Venue.find({ manager: req.user._id });
    const booking = await Booking.find({
      venue: { $in: venues.map((v) => v._id) },
      booking_status: 'pending',
    })
      .populate('venue')
      .populate('organizer')
      .populate('event');
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getBookingByEventId = async (req, res) => {
  try {
    const bookings = await Booking.find({ event: req.params.id }).populate(
      'venue'
    );
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  getBookingByVenueId,
  getBookingByOrganizerId,
  updateBookingById,
  deleteBookingById,
  getBookingByVenueManagerId,
  getBookingByVenueManagerIdPending,
  getBookingByEventId,
};
