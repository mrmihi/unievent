const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { HTTP_STATUS } = require('../utils/http');
const { makeResponse } = require('../utils/response');
const tokenHelper = require('../helpers/token.helper');

const protect = async (req, res, next) => {
  const token = tokenHelper.getTokenFrom(req);
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  if (!decodedToken.id) {
    return makeResponse({
      res,
      message: 'token missing or invalid',
      status: HTTP_STATUS.UNAUTHORIZED,
    });
  }
  req.user = await User.findById(decodedToken.id);
  next();
};

// const patientProtect = asyncHandler(async (req, res, next) => {
//   if (req.user.role == 'patient') {
//     next();
//   } else {
//     res.status(401);
//     throw new Error('Not authorized, not a patient');
//   }
// });

module.exports = {
  protect,
};
