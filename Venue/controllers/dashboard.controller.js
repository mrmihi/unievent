const Venue = require('../models/venue.model');
const Booking = require('../models/booking.model');
const Review = require('../models/review.model');

const getDashboardStats = async (req, res) => {
    try {
        const venueCount = await Venue.countDocuments({})
        const bookingCount = await Booking.countDocuments({})
        const reviewCount = await Review.countDocuments({})
        const bookings = await Booking.find({})
        let revenue = 0

        bookings.forEach(booking => {
            if (booking.booking_status === 'approved' && booking.payment_status === 'completed') {
                revenue += booking.price
            }
        })
        res.status(200).json({
            venueCount,
            bookingCount,
            reviewCount,
            revenue
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const GetLatestFiveBookingByVenueManager = async (req, res) => {
    try {
        const id = req.user._id
        const bookings = await Booking
            .find()
            .populate('venue')
            .populate('organizer')
            .populate('event')
            .sort({ createdAt: -1 })

        const data = bookings.filter(booking => booking.venue.manager.toString() === id.toString())
        const latestFive = data.slice(0, 5)

        res.status(200).json(latestFive)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const revenueForMonthAndYearChart = async (req, res) => {
    try {
        const managerId = req.user._id;
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const bookings = await Booking.find({ booking_status: "approved", payment_status: "completed" }).populate({
            path: 'venue',
            select: 'manager',
            match: { manager: managerId }
        });

        const revenueData = {};

        bookings.forEach(booking => {
            const year = booking.start_time.getFullYear();
            const month = booking.start_time.getMonth();
            const key = `${year} ${months[month]}`;
            console.log(key)
            if (!revenueData[key]) {
                revenueData[key] = 0;
            }
            revenueData[key] += booking.price;
        });

        const result = Object.entries(revenueData).map(([key, value]) => {
            const [year, month] = key.split(' ');
            return {
                year: Number(year),
                month,
                revenue: value
            };
        });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const revenueForYearChart = async (req, res) => {
    try {
        const managerId = req.user._id;
        const year = req.query.year;
        const bookings = await Booking.find({ booking_status: "approved", payment_status: "completed" }).populate({
            path: 'venue',
            select: 'manager',
            match: { manager: managerId }
        });

        const revenueData = [];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let total = 0;
        for (let i = 0; i < 12; i++) {
            bookings.forEach(booking => {
                if (booking.start_time.getMonth() === i && booking.start_time.getFullYear() == year) {
                    total += booking.price;
                }
            });

            if (total > 0) {
                revenueData.push({
                    year,
                    month: months[i],
                    revenue: total
                });
            }
            total = 0;
        }

        res.status(200).json(revenueData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getDashboardStats,
    GetLatestFiveBookingByVenueManager,
    revenueForMonthAndYearChart,
    revenueForYearChart
}
