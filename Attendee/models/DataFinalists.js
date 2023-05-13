// import mongoose from "mongoose";
const mongoose = require("mongoose");

const DataFinalistsSchema = new mongoose.Schema(
    {
        attendeeId: String,
        cost: String,
        feedbacks: {
            type: [mongoose.Types.ObjectId],
            of: Number,
        },
    },
    { timestamps: true }
);

const DataFinalists = mongoose.model("DataFinalists", DataFinalistsSchema);
// export default DataFinalists;

module.exports = { DataFinalists };