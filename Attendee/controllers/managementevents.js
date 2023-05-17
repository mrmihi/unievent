// import OverallStat from "../models/OverallStat.js";

const { OverallStat } = require("../models/OverallStat");

const getEvents = async (req, res) => {

    try {
        const id = req.params.id;
        console.log("atttt", id);
        const overallStat = await OverallStat.find();

        res.status(200).json([overallStat[0]]);
    } catch (error) {
        res.status(502).json({ message: error.message });
    }
};

module.exports = { getEvents };
