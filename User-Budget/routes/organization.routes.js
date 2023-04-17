const express = require('express');
// const { createUser, loginUser, getAllUsers,deleteUser,updateUser } = require('../controllers/user.js');
const {
    protect, 
    adminProtect,
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

organizationRouter.post('/register',protect,adminProtect,createOrganization); //create organization
organizationRouter.post('/login',loginOrganization);//login organization
organizationRouter.get('/',protect,adminProtect,getAllOrganizations);//get all organizations
organizationRouter.delete('/:id',protect,adminProtect,deleteOrganization);//delete organization
organizationRouter.put('/:id',protect,adminProtect,updateOrganization);//update organization


module.exports = organizationRouter;