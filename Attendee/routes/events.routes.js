const express = require("express");
const { getEvents } = require("../controllers/managementevents.js");

const router = express.Router();

router.get("/managementevents", getEvents);

module.exports = router;
