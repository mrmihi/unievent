// import mongoose from "mongoose";
const mongoose = require("mongoose");

const FeedBackSchema = new mongoose.Schema(
    {
        name: String,
        price: Number,
        description: String,
        category: String,
        rating: Number,
        participations: Number,
    },
    { timestamps: true }
);

const FeedBack = mongoose.model("FeedBack", FeedBackSchema);
// export default FeedBack;

module.exports = { FeedBack };