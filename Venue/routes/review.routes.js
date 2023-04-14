const express = require('express');

const reviewRouter = express.Router();

reviewRouter.get('/info', (req, res) => {
  res.json('Review Router');
});

module.exports = reviewRouter;
