// import OverallStat from "../models/OverallStat.js";

const OverallStat = require("../models/OverallStat");

const getEvents = async (req, res) => {
    try {
        const overallStats = await OverallStat.find();

        res.status(200).json(overallStats[0]);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports = {
    getEvents,
};
