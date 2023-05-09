const Review = require('../models/review.model');
const Venue = require('../models/venue.model');

const createReview = async (req, res) => {
    try {
        const venue_id = req.body.venue;
        const venue = await Venue.findById(venue_id);
        const venueManager = venue.manager;
        const review = await Review.create({ ...req.body, organizer: req.org._id, manager: venueManager });
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find({}).populate('organizer', 'name').populate('venue', 'name');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateReviewById = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findByIdAndUpdate({ _id: id }, req.body, {
            new: true,
            runValidators: true,
        });
        if (!review) return res.status(404).json({ message: 'Review not found' });
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteReviewById = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findByIdAndUpdate(
            { _id: id },
            { isDeleted: true },
            { new: true, runValidators: true }
        );
        if (!review) return res.status(404).json({ message: 'Review not found' });
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getReviewsByVenueId = async (req, res) => {
    try {
        const reviews = await Review.find({ venue: req.params.id });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getReviewsByOrganizerId = async (req, res) => {
    try {
        const reviews = await Review.find({ organizer: req.params.id });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getReviewsByVenueManager = async (req, res) => {
    try {
        const reviews = await Review.find({ manager: req.params.id })
            .populate('organizer', 'name')
            .populate('venue', 'name');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createReview,
    getAllReviews,
    getReviewById,
    updateReviewById,
    deleteReviewById,
    getReviewsByVenueId,
    getReviewsByOrganizerId,
    getReviewsByVenueManager,
};
