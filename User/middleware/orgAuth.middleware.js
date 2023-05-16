const jwt = require('jsonwebtoken');
const Org = require('../models/org.model');
const { HTTP_STATUS } = require('../../Event/utils/http');
const { makeResponse } = require('../../Event/utils/response');
const tokenHelper = require('../../Event/helpers/token.helper');
const Event = require('../../Event/models/event.model');

const protect = async (req, res, next) => {
  const token = tokenHelper.getTokenFrom(req);
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  if (!decodedToken.id) {
    console.log('token missing or invalid');
    return makeResponse({
      res,
      message: 'token missing or invalid',
      status: HTTP_STATUS.UNAUTHORIZED,
    });
  }
  req.org = await Org.findById({ _id: decodedToken.id }).select('-password');
  next();
};

const authOrg = async (req, res, next) => {
  const event = await Event.findById(req.params.id);

  if (req.org._id.toString() !== event.org.toString())
    return makeResponse({ res, status: 403, message: 'Unauthorized' });
  next();
};

module.exports = {
  protect,
  authOrg,
};