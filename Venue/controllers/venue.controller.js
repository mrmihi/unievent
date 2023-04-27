const Venue = require('../models/venue.model');

const createVenue = async (req, res) => {
  try{
    const venue = await Venue.create({...req.body, manager: req.user._id})
    res.status(201).json(venue)
  }catch (error){
      res.status(500).json({message: error.message})
  }
};

const getAllVenues = async (req, res) => {
  try{
    const venues = await Venue.find({})
    if(venues.length === 0){
      return res.status(404).json({message: 'Venues not found'})
    }
    res.status(200).json(venues)
  }catch (error){
      res.status(500).json({message: error.message})
  }
};

const getVenueById = async (req, res) => {
  try{
    const venue = await Venue.findById(req.params.id).populate('manager')
    res.status(200).json(venue)
  }catch (error){
      res.status(500).json({message: error.message})
  }
};

const getVenuesByManagerId = async (req, res) => {
  try{
    const venues = await Venue.find({manager: req.params.id})
    res.status(200).json(venues)
  }catch (error){
      res.status(500).json({message: error.message})
  }
};

const updateVenueById = async (req, res) => {
  try{
    const {id} = req.params
    const venue = await Venue.findByIdAndUpdate({_id: id}, req.body, {new: true, runValidators: true})
    if(!venue){
      return res.status(404).json({message: 'Venue not found'})
    }
    res.status(200).json(venue)
  }catch (error){
      res.status(500).json({message: error.message})
  }
};

const deleteVenueById = async (req, res) => {
  try{
    const {id} = req.params
    const venue = await Venue.findOneAndDelete({_id: id})
    if(!venue){
      return res.status(404).json({message: 'Venue not found'})
    }
    res.status(200).json(venue)
  }catch (error){
      res.status(500).json({message: error.message})
  }
};

module.exports = {
  createVenue,
  getAllVenues,
  getVenueById,
  getVenuesByManagerId,
  updateVenueById,
  deleteVenueById
};
