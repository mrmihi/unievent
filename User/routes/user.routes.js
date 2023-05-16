const express = require('express');
const { createUser, loginUser, getAllUsers,deleteUser,updateUser, getMe, getUserByID, getAllAdmin, getAllStaff} = require('../controllers/user.js');

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

userRouter.post('/register',protect, adminProtect, createUser); //create user
userRouter.post('/login',loginUser);//login user
userRouter.get('/admin',getAllAdmin);//get all users
userRouter.get('/staff',getAllStaff);//get all users
userRouter.get('/',getAllUsers);//get all users
userRouter.get('/profile', protect, getMe);//get all users')
userRouter.get('/:id', getUserByID);//get all users')
userRouter.delete('/:id',deleteUser);//delete user
userRouter.put('/:id', updateUser);//update user

module.exports = userRouter;
