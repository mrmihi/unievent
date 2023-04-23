const express = require("express");
const { getEvents } = require("../controllers/events.js");

const router = express.Router();

router.get("/events", getEvents);

module.exports = router;
