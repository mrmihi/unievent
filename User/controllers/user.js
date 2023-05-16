const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const generateToken = require('../util/token.js');

//create user
const createUser = async (req, res) => {
  try {
    const { email, password, role,firstname ,lastname,itnumber  } = req.body; //get name, email, password and role from request body

    //check if user already exists
    const existingUser=await User.findOne({email})//find user by email
    if(existingUser){
        return res.status(400).json({message: 'User already exists'})
    }


    const salt = await bcrypt.genSalt(10); //generate salt
    const hashedPassword = await bcrypt.hash(password, salt); //hash password
    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role,
      itnumber
      
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        itnumber: user.itnumber,
        token: generateToken(user._id),

      }); //generate token
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    } //if user is not created
  } catch (error) {
    res.status(500).json({ message: error.message });
  } //catch error
}; //create user

//login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body; //get email and password from request body
    const user = await User.findOne({ email }); //find user by email

    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(201).json({
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      }); //generate token


      // res.status(201).json(user)//return user
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    } //if user is not created
  } catch (error) {
    res.status(500).json({ message: error.message });
  } //catch error
}; //login user

//get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}); //find all users
    res.status(200).json(users); //return all users
  } catch (error) {
    res.status(500).json({ message: error.message });
  } //catch error
}; //get all users

//delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params; //get id from request params
    const review = await User.findByIdAndDelete({ _id: id }); //delete user by id

    if (!review) {
      return res.status(404).json({ message: 'User not found' });
    } //if user is not deleted
    else {
      res.status(200).json({ message: 'User deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  } //catch error
};

//update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params; //get id from request params
    const { firstname,lastname,foodtype,mobile,email,address,itnumber,profileimage } = req.body; //get name, email, password and role from request body

    const user = await User.findByIdAndUpdate(
      { _id: id },
      { firstname,lastname,foodtype,mobile,email,address,itnumber,profileimage },
      { new: true }
    ); //update user by id

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    } //if user is not updated
    else {
      res.status(200).json({ message: 'User updated successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  } //catch error
};

//get me
const getMe = async (req, res) => {
  try {
    const me = await User.findById(req.user.id).select('-password');
    res.status(200).json(me);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } //catch error
};

//get user by id
const getUserById = async (req, res) => {
  try {
    const { id } = req.params; //get id from request params
    const review = await User.findById({ _id: id });//find user by id

    if (!review) {
      return res.status(404).json({ message: 'User not found' });
    } //if user is not found
    else {
      res.status(200).json(review);
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  } //catch error
};


module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  deleteUser,
  updateUser,
  getMe,
  getUserById
}; //export all functions
