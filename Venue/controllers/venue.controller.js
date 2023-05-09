const Venue = require('../models/venue.model');
const Review = require('../models/review.model');
const Organizer = require('../../User/models/org.model');

const createVenue = async (req, res) => {
  try {
    const venue = await Venue.create({ ...req.body, manager: req.user._id });
    res.status(201).json(venue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllVenues = async (req, res) => {
  try {
    const venues = await Venue.find({});
    if (venues.length === 0) {
      return res.status(404).json({ message: 'Venues not found' });
    }
    res.status(200).json(venues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getVenueById = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    res.status(200).json(venue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getVenuesByManagerId = async (req, res) => {
  try {
    const venues = await Venue.find({ manager: req.params.id });
    res.status(200).json(venues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateVenueById = async (req, res) => {
  try {
    const { id } = req.params;
    const venue = await Venue.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!venue) {
      return res.status(404).json({ message: 'Venue not found' });
    }
    res.status(200).json(venue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteVenueById = async (req, res) => {
  try {
    const { id } = req.params;
    const venue = await Venue.findOneAndDelete({ _id: id });
    if (!venue) {
      return res.status(404).json({ message: 'Venue not found' });
    }
    res.status(200).json(venue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getVenueAndReviews = async (req, res) => {
  try {
    const { id } = req.params;
    const venue = await Venue.findById(id);
    if (!venue) {
      return res.status(404).json({ message: 'Venue not found' });
    }
    const reviews = await Review.find({ venue: id });
    console.log(reviews);
    const reviewsWithOrganizers = [];

    if (reviews.length !== 0) {
      for (const review of reviews) {
        const organizer = await Organizer.findById(review.organizer).select(
          'name'
        );
        reviewsWithOrganizers.push({
          ...review.toObject(),
          organizer,
        });
      }
    }

    res.status(200).json({ venue, reviews: reviewsWithOrganizers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createVenue,
  getAllVenues,
  getVenueById,
  getVenuesByManagerId,
  updateVenueById,
  deleteVenueById,
  getVenueAndReviews,
};
