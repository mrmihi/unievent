const express = require('express');
const {
  addASpeaker,
  deleteSpeaker,
  getSpeakers,
  updateSpeakerDetails,
  getEventSpecificSpeakers,
} = require('../controllers/speaker.controller.js');

const speakerRouter = express.Router();

//get all volunteers

//register as an volunteer
speakerRouter.get('/', getSpeakers);
speakerRouter.get('/:id', getEventSpecificSpeakers);
speakerRouter.post('/', addASpeaker);
speakerRouter.put('/:id', updateSpeakerDetails);
speakerRouter.delete('/:id', deleteSpeaker);

module.exports = speakerRouter;
