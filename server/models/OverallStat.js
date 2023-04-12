import mongoose from "mongoose";

const OverallStatSchema = new mongoose.Schema(
    {
        totalAttendees: Number,
        yearlyAttendeesTotal: Number,
        yearlyTotalPartAttendees: Number,
        year: Number,
        monthlyData: [
            {
                month: String,
                totalEvents: Number,
                totalUnits: Number,
            },
        ],
        dailyData: [
            {
                date: String,
                totalEvents: Number,
                totalUnits: Number,
            },
        ],
        EventsByCategory: {
            type: Map,
            of: Number,
        },
    },
    { timestamps: true }
);

const OverallStat = mongoose.model("OverallStat", OverallStatSchema);
export default OverallStat;
