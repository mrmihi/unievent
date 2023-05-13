const express = require("express");
const {
  getAdministrator,
  createAdministrator,
  updateAdministrator,
  deleteAdministrator,
} = require("../controllers/management.js");

const router = express.Router();

router.get("/administrator", getAdministrator);
router.post("/administrator", createAdministrator);
router.patch("/administrator/:id", updateAdministrator);
router.delete("/administrator/:id", deleteAdministrator);

module.exports = router;
