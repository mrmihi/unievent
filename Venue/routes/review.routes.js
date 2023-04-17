const express = require('express');
const {
  protect,
  authOrg,
} = require('../../User/middleware/orgAuth.middleware');
const {
  createReview,
  getAllReviews,
  getReviewById,
  updateReviewById,
  deleteReviewById,
  getReviewsByVenueId,
  getReviewsByOrganizerId
} = require('../controllers/review.controller');

const reviewRouter = express.Router();

reviewRouter.post('/', protect, authOrg, createReview);
reviewRouter.get('/', getAllReviews);
reviewRouter.get('/:id', getReviewById);
reviewRouter.put('/:id', updateReviewById);
reviewRouter.delete('/:id', deleteReviewById);
reviewRouter.get('/venue/:id', getReviewsByVenueId)
reviewRouter.get('/organizer/:id', protect, authOrg, getReviewsByOrganizerId)

module.exports = reviewRouter;
