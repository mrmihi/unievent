const express = require('express');
const {
  applyToAnOpportunity,
  deleteVolunteerApplication,
  // getEventSpecificVolunteers,
  getRegisteredOpportunitiesByUserID,
  getVolunteers,
  updateVolunteerApplication,
  updateApplicationStatus,
} = require('../controllers/volunteer.controller.js');

const volunteerRouter = express.Router();

//get all volunteers

//register as an volunteer
volunteerRouter.get('/', getVolunteers);
// volunteerRouter.get("/:id", getEventSpecificVolunteers);
volunteerRouter.post('/:id', applyToAnOpportunity);
volunteerRouter.get('/:id', getRegisteredOpportunitiesByUserID);
volunteerRouter.put('/:id', updateVolunteerApplication);
volunteerRouter.put('/status/:id', updateApplicationStatus);
volunteerRouter.delete('/:id', deleteVolunteerApplication);

module.exports = volunteerRouter;
