const jwt = require('jsonwebtoken');
const Org = require('../../User/model/org.model');
const { HTTP_STATUS } = require('../utils/http');
const { makeResponse } = require('../utils/response');
const tokenHelper = require('../helpers/token.helper');
const Event = require('../models/event.model');

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
  req.org = await Org.findById(decodedToken.id);
  next();
};

const authOrg = async (req, res, next) => {
  const event = await Event.findById(req.params.id);
  console.log('event org : ' + event.user);
  console.log('req org : ' + req.org._id);
  if (req.org._id.toString() !== event.user.toString())
    return makeResponse({ res, status: 403, message: 'Unauthorized' });
  next();
};

module.exports = {
  protect,
  authOrg,
};
