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

module.exports = {
    getDashboardStats
}
