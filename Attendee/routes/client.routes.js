const express = require("express");
const {
  getFeedBacks,
  getAttendee,
  getDataFinalists,
  createDataFinalist,
  updateDataFinalist,
  deleteDataFinalist,
  createAttendees,
  updateAttendees,
  deleteAttendees,
  getAttendeeById,
  createAttendeeStatus,
  updateAttendeeStatus,
  deleteAttendeeStatus,
  getAllAttendeeStatuses,
  //getEventSpcificAttendees,
} = require("../controllers/client.js");

const EmailSender = require("../controllers/sendEmail.js");

const router = express.Router();

router.get("/feedBacks", getFeedBacks);
router.get("/attendees", getAttendee);
router.get("/attendees/:id", getAttendeeById);

router.get("/dataFinalists", getDataFinalists);
router.post("/dataFinalists", createDataFinalist);
router.patch("/dataFinalists/:id", updateDataFinalist);
router.delete("/dataFinalists/:id", deleteDataFinalist);

router.post("/attendees", createAttendees);
router.patch("/attendees/:id", updateAttendees);
router.delete("/attendees/:id", deleteAttendees);

router.post("/attendeeStatus", createAttendeeStatus);
router.patch("/attendeeStatus/:id", updateAttendeeStatus);
router.delete("/attendeeStatus/:id", deleteAttendeeStatus);
router.get("/attendeeStatus", getAllAttendeeStatuses);
// router.get("/attendeeStatus/:id", getAttendeeStatusById);

//router.get("/eventSpecificAttendees/:event", getEventSpcificAttendees);

router.post("/send", async (req, res) => {
  try {
    const { fullName, email, message } = req.body;
    EmailSender({ fullName, email, message });
    res.json({ msg: "Your message sent successfully" });
  } catch (error) {
    res.status(404).json({ msg: "Error ❌" });
  }
});

module.exports = router;
