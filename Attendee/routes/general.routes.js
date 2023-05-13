const express = require("express");
const { getAttendee, getDashboardStats } = require("../controllers/general.js");

const router = express.Router();

router.get("/attendee/:id", getAttendee);

router.get("/dashboard", getDashboardStats);

module.exports = router;
