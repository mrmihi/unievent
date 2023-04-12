import mongoose from "mongoose";

const FeedBackStatSchema = new mongoose.Schema(
    {
        feedBackId: String,
        yearlyAttendeesTotal: Number,
        yearlyTotalPartAttendees: Number,
        year: Number,
        monthlyData: [
            {
                month: String,
                totalevets: Number,
                totalUnits: Number,
            },
        ],
        dailyData: [
            {
                date: String,
                totalevets: Number,
                totalUnits: Number,
            },
        ],
    },
    { timestamps: true }
);

const FeedBackStat = mongoose.model("FeedBackStat", FeedBackStatSchema);
export default FeedBackStat;
