const express = require('express');
const { protect, authOrg } = require('../middleware/orgAuth.middleware.js');

const {
  createOrg,
  getAllOrg,
  deleteOrg,
  updateOrg,
  loginOrg,
  getOrgByInchargeID,
  getOrgByID
} = require('../controllers/org.controller.js');

const orgRouter = express.Router();

orgRouter.post('/register', createOrg);
orgRouter.post('/login', loginOrg);
orgRouter.get('/', getAllOrg);
orgRouter.get('/incharge/:id', getOrgByInchargeID);
orgRouter.get('/:id', getOrgByID);
orgRouter.delete('/:id', deleteOrg);
orgRouter.put('/:id', updateOrg);

module.exports = orgRouter;