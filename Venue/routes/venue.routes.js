const express = require('express');

const venueRouter = express.Router();

venueRouter.get('/info', (req, res) => {
  res.json('Venue Router');
});

module.exports = venueRouter;
