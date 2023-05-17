const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();

const protect = async (req, res, next) => {
  let token; //get token from header
 
  //check if token is present
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]; //get token from header

      const decoded = jwt.verify(token, process.env.JWT_SECRET); //verify token

      req.user = await User.findOne({ _id: decoded.id }).select('-password'); //get user from database

      next(); //go to next middleware
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    } //catch error
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  } //if token is not present
}; //protect


//check if user is admin
const adminProtect = async (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } //if user is admin
  else {
    res.status(401).json({ message: 'Not authorized as a admin' });
  } //if user is not admin
};

//check if user is student
const studentProtect = async (req, res, next) => {
  if (req.user && req.user.role === 'student') {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as a student' });
  }
};

//check if user is attendee
const attendeeProtect = async (req, res, next) => {
  if (req.user && req.user.role === 'attendee') {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as a attendee' });
  }
};

//check if user is financial manager
const financialManagerProtect = async (req, res, next) => {
  if (req.user && req.user.role === 'accountant') {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as a financial manager' });
  }
};

//check if user is venue manager
const venueManagerProtect = async (req, res, next) => {
  if (req.user && req.user.role === 'venue') {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as a venue manager' });
  }
};

//check if user is resource manager
const resourceManagerProtect = async (req, res, next) => {
  if (req.user && req.user.role === 'resource') {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as a resource manager' });
  }
};

//check if user is staff
const staffProtect = async (req, res, next) => {
  if (req.user && req.user.role === 'staff') {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as a staff' });
  }
};

//check if user is organization
const organizationProtect = async (req, res, next) => {
  if (req.organization && req.user.role === 'organization') {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as a organization' });
  }
};

//export all middleware
module.exports = {
  protect,
  adminProtect,
  organizationProtect,
  studentProtect,
  attendeeProtect,
  financialManagerProtect,
  venueManagerProtect,
  resourceManagerProtect,
  staffProtect,
  
};

