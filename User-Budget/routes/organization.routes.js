const express = require('express');
// const { createUser, loginUser, getAllUsers,deleteUser,updateUser } = require('../controllers/user.js');
const { adminProtect, organizationProtect, studentProtect } = require('../middleware/authMiddleware.js');
const { createOrganization,getAllOrganizations,deleteOrganization } = require('../controllers/organization.js');


const organizationRouter = express.Router();//create router

organizationRouter.post('/register',createOrganization,adminProtect); //create organization
// userRouter.post('/login',loginUser);//login user
organizationRouter.get('/',getAllOrganizations,adminProtect);//get all organizations
organizationRouter.delete('/:id',deleteOrganization);//delete organization
// userRouter.put('/:id', updateUser);//update user


module.exports = organizationRouter;