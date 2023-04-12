import Attendee from "../models/Attendee.js";
import OverallStat from "../models/OverallStat.js";
import DataFinalists from "../models/DataFinalists.js";

export const getAttendee = async (req, res) => {
    try {
        const { id } = req.params;
        const attendee = await Attendee.findById(id);
        res.status(200).json(attendee);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getDashboardStats = async (req, res) => {
    try {
        // hardcoded values
        const currentMonth = "November";
        const currentYear = 2021;
        const currentDay = "2021-11-15";

        /* Recent DataFinalists */
        const dataFinalists = await DataFinalists.find()
            .limit(50)
            .sort({ createdOn: -1 });

        /* Overall Stats */
        const overallStat = await OverallStat.find({ year: currentYear });

        const {
            totalAttendees,
            yearlyTotalPartAttendees,
            yearlyAttendeesTotal,
            monthlyData,
            EventsByCategory,
        } = overallStat[0];

        const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
            return month === currentMonth;
        });

        const todayStats = overallStat[0].dailyData.find(({ date }) => {
            return date === currentDay;
        });

        res.status(200).json({
            totalAttendees,
            yearlyTotalPartAttendees,
            yearlyAttendeesTotal,
            monthlyData,
            EventsByCategory,
            thisMonthStats,
            todayStats,
            dataFinalists,
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
