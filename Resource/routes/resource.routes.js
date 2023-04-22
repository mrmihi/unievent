const router = require('express').Router();
const ResourceController = require('../controllers/resource.controller');
const {
  protect,
  authOrg,
  authCreator,
} = require('../../User/middleware/orgAuth.middleware');

router.get('/info', async (request, response) => {
  response.json('Welcome to the Resource API');
});

router.get('/', ResourceController.getAllResources);

router.get('/:id', ResourceController.getResourceById);

router.post('/', ResourceController.createResource);

router.put('/:id', ResourceController.updateResourceById);

router.delete('/:id', ResourceController.deleteResourceById);

module.exports = router;
