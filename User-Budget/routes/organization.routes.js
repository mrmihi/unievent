const express = require('express');
// const { createUser, loginUser, getAllUsers,deleteUser,updateUser } = require('../controllers/user.js');
const { adminProtect,
    organizationProtect,
    studentProtect,
    attendeeProtect, 
    financialManagerProtect, 
    venueManagerProtect ,
    resourceManagerProtect,
    staffProtect} = require('../middleware/authMiddleware.js');

const { createOrganization,
    getAllOrganizations,
    deleteOrganization,
    updateOrganization,
    loginOrganization } = require('../controllers/organization.js');


const organizationRouter = express.Router();//create router

organizationRouter.post('/register',createOrganization,adminProtect); //create organization
organizationRouter.post('/login',loginOrganization);//login organization
organizationRouter.get('/',getAllOrganizations,adminProtect);//get all organizations
organizationRouter.delete('/:id',deleteOrganization,organizationProtect,adminProtect);//delete organization
organizationRouter.put('/:id',updateOrganization,organizationProtect,adminProtect);//update organization


module.exports = organizationRouter;