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
  if (req.org._id.toString() !== event.orgId.toString())
    return makeResponse({ res, status: 403, message: 'Unauthorized' });
  next();
};

const authCreator = async (req, res, next) => {
  const orgName = req.org.name;
  const eventOrg = req.body.org;
  if (orgName !== eventOrg)
    return makeResponse({
      res,
      status: 403,
      message:
        'Unauthorized to create events that belongs to another organization!',
    });
  next();
};
module.exports = {
  protect,
  authOrg,
  authCreator,
};
