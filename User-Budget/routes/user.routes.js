const express = require('express');
const { createUser, loginUser, getAllUsers,deleteUser,updateUser } = require('../controllers/user.js');

const { protect,
    adminProtect,
    organizationProtect,
    studentProtect,
    attendeeProtect, 
    financialManagerProtect, 
    venueManagerProtect,
    resourceManagerProtect,
    staffProtect} = require('../middleware/authMiddleware.js');



const userRouter = express.Router();//create router

userRouter.post('/register',protect,adminProtect,createUser); //create user
userRouter.post('/login',loginUser);//login user
userRouter.get('/', getAllUsers);//get all users
userRouter.delete('/:id', deleteUser);//delete user
userRouter.put('/:id', updateUser);//update user


module.exports = userRouter;

