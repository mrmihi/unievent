const router = require('express').Router();
const RegistrantController = require('../controllers/registrant.controller');

router.get('/info', async (request, response) => {
  response.json('Welcome to the Event API');
});

router.get('/', RegistrantController.getAllRegistrants);

router.get('/:id', RegistrantController.getRegistrantById);

router.post('/', RegistrantController.createRegistrant);

router.put('/:id', RegistrantController.updateRegistrantById);

router.delete('/:id', RegistrantController.deleteRegistrantById);

module.exports = router;
