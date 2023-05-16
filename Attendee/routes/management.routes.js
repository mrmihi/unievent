const express = require("express");
const {
  getAdministrator,
  createAdministrator,
  updateAdministrator,
  deleteAdministrator,
  getEvents,
} = require("../controllers/management.js");

const router = express.Router();

router.get("/administrator", getAdministrator);
router.post("/administrator", createAdministrator);
router.patch("/administrator/:id", updateAdministrator);
router.delete("/administrator/:id", deleteAdministrator);
router.get("/managementevents", getEvents);

module.exports = router;
