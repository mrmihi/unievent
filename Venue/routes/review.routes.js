const express = require('express');
const {
  protect,
} = require('../../User/middleware/orgAuth.middleware');
const {
  createReview,
  getAllReviews,
  getReviewById,
  updateReviewById,
  deleteReviewById,
  getReviewsByVenueId,
  getReviewsByOrganizerId,
  getReviewsByVenueManager,
} = require('../controllers/review.controller');

const reviewRouter = express.Router();

reviewRouter.post('/', protect, createReview);
reviewRouter.get('/', getAllReviews);
reviewRouter.get('/:id', getReviewById);
reviewRouter.put('/:id', updateReviewById);
reviewRouter.delete('/:id', deleteReviewById);
reviewRouter.get('/venue/:id', getReviewsByVenueId)
reviewRouter.get('/organizer/:id', protect, getReviewsByOrganizerId)
reviewRouter.get('/venue-manager/:id', getReviewsByVenueManager)

module.exports = reviewRouter;
