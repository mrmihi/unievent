const router = require('express').Router();
const UserController = require('../controllers/users.controller');

router.get('/info', async (request, response) => {
  response.json('Welcome to the Event API');
});

// router.get('/:id', EventController.getEventById);

router.post('/', UserController.createUser);

module.exports = router;
