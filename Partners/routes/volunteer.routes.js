const express = require('express');
const {
  applyToAnOpportunity,
  deleteVolunteerApplication,
  // getEventSpecificVolunteers,
  getVolunteers,
  updateVolunteerApplication,
} = require('../controllers/volunteer.controller.js');

const volunteerRouter = express.Router();

//get all volunteers

//register as an volunteer
volunteerRouter.get('/', getVolunteers);
// volunteerRouter.get("/:id", getEventSpecificVolunteers);
volunteerRouter.post('/', applyToAnOpportunity);
volunteerRouter.put('/:id', updateVolunteerApplication);
volunteerRouter.delete('/:id', deleteVolunteerApplication);

module.exports = volunteerRouter;
