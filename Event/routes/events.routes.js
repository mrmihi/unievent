const router = require('express').Router();
const EventController = require('../controllers/event.controller');
const { protect, authUser } = require('../middleware/auth.middleware');

router.get('/info', async (request, response) => {
  response.json('Welcome to the Event API');
});

router.get('/', EventController.getAllEvents);

router.get('/:id', EventController.getEventById);

router.post('/', protect, EventController.createEvent);

router.put('/:id', protect, authUser, EventController.updateEventById);

router.delete('/:id', protect, authUser, EventController.deleteEventById);

// router.get(
//   '/allevents/:club',
//   (req, res, next) => {
//     isLogin(req, res, next);
//   },
//   EventController.getAllEvents
// );

module.exports = router;
