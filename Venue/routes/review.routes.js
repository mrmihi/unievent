const express = require('express');

const reviewRouter = express.Router();

reviewRouter.get('/', (req, res) => {
  res.json('Review Router');
});

// reviewRouter.post('/', createReview)
// reviewRouter.get('/', getAllReviews)
// reviewRouter.get('/:id', getReviewById)
// reviewRouter.put('/:id', updateReviewById)
// reviewRouter.delete('/:id', deleteReviewById)
// reviewRouter.get('/venue/:id', getReviewsByVenueId)
// reviewRouter.get('/organizer/:id', getReviewsByOrganizerId)

module.exports = reviewRouter;
