const Venue = require('../models/venue.model');

const createVenue = async (req, res) => {
  try{
    const venue = await Venue.create({...req.body, manager: req.user._id})
    res.status(201).json(venue)
  }catch (error){
      res.status(500).json({message: error.message})
  }
};

module.exports = {
  createVenue,
};
