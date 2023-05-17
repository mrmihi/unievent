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

router.get('/byorg/:id', EventController.getEventsByOrg);

router.post('/', EventController.createEvent);

router.put('/:id', EventController.updateEventById);

router.delete('/:id', EventController.deleteEventById);

// router.get(
//   '/allevents/:club',
//   (req, res, next) => {
//     isLogin(req, res, next);
//   },
//   EventController.getAllEvents
// );

module.exports = router;
