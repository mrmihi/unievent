const Venue = require('../models/venue.model');
const Booking = require('../models/booking.model');
const Review = require('../models/review.model');

const getDashboardStats = async (req, res) => {
    try{
        const venueCount = await Venue.countDocuments({})
        const bookingCount = await Booking.countDocuments({})
        const reviewCount = await Review.countDocuments({})
        const bookings = await Booking.find({})
        let revenue = 0
        bookings.forEach(booking => {
            revenue += booking.price
        })
        res.status(200).json({
            venueCount,
            bookingCount,
            reviewCount,
            revenue
        })
    }catch (error){
        res.status(500).json({message: error.message})
    }
}

const GetLatestFiveBookingByVenueManager = async (req, res) => {
    try{
        const id = req.user._id
        const bookings = await Booking
            .find()
            .populate('venue')
            .populate('organizer')
            .populate('event')
            .sort({createdAt: -1})

        const data = bookings.filter(booking => booking.venue.manager.toString() === id.toString())
        const latestFive = data.slice(0, 5)

        res.status(200).json(latestFive)
    }catch (error){
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    getDashboardStats,
    GetLatestFiveBookingByVenueManager
}
