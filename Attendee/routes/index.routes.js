const express = require("express");

const router = express.Router();

const clientRoutes = require("./client.routes.js");
const generalRoutes = require("./general.routes.js");
const managementRoutes = require("./management.routes.js");
const eventsRoutesAM = require("./events.routes.js");

router.use("/client", clientRoutes);
router.use("/general", generalRoutes);
router.use("/management", managementRoutes);
router.use("/events", eventsRoutesAM);


module.exports = router;
