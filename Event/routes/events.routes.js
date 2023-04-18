const router = require('express').Router();
const EventController = require('../controllers/event.controller');
const {
  protect,
  authOrg,
  authCreator,
} = require('../../User/middleware/orgAuth.middleware');

router.get('/info', async (request, response) => {
  response.json('Welcome to the Event API');
});

router.get('/', EventController.getAllEvents);

router.get('/:id', EventController.getEventById);

router.post('/', protect, authCreator, EventController.createEvent);

router.put('/:id', protect, authOrg, EventController.updateEventById);

router.delete('/:id', protect, authOrg, EventController.deleteEventById);

// router.get(
//   '/allevents/:club',
//   (req, res, next) => {
//     isLogin(req, res, next);
//   },
//   EventController.getAllEvents
// );

module.exports = router;
