const express = require('express');

const { createUser, loginUser, getAllUsers,deleteUser,updateUser, getMe, getUserById,getAllAdmin,getAllStaff } = require('../controllers/user.js');


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

userRouter.get('/admin',getAllAdmin);//get all admins
userRouter.get('/staff',getAllStaff);//get all staffs
userRouter.post('/register',createUser); //create user
userRouter.post('/login',loginUser);//login user
userRouter.get('/',getAllUsers);//get all users
userRouter.get('/profile', protect, getMe);//get all users')
userRouter.delete('/:id',deleteUser);//delete user
userRouter.put('/:id', updateUser);//update user

userRouter.get('/:id', getUserById);//update user
userRouter.get('/admin',adminProtect,getAllAdmin);//get all admin
userRouter.get('/staff',staffProtect,getAllStaff);//get all staff
module.exports = userRouter;

