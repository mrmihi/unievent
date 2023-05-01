const express = require("express");

const router = express.Router();

const clientRoutes = require("./client.routes.js");
const generalRoutes = require("./general.routes.js");
const managementRoutes = require("./management.routes.js");
const eventsRoutes = require("./events.routes.js");

router.use("/client", clientRoutes);
router.use("/general", generalRoutes);
router.use("/management", managementRoutes);
router.use("/events", eventsRoutes);

module.exports = router;
