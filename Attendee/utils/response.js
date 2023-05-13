const { HTTP_STATUS } = require('./http');
const { NODE_ENV } = require('./config');
const logger = require('./logger');

/**
 * @constant ERROR_RESPONSE error messages for error responses
 */

const ERROR_RESPONSE = {
  UNAUTHORIZED: 'You are not authorized to access this endpoint',
};

const makeResponse = ({ res, success = true, message, data = {}, status }) => {
  if (!success) {
    logger.error(message);
    status = status || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  } else {
    status = status || HTTP_STATUS.OK;
  }
  return res.status(status).json({
    success,
    message: message.message || message,
    data: data,
    stack: NODE_ENV !== 'production' ? message.stack : null,
  });
};

module.exports = {
  makeResponse,
  ERROR_RESPONSE,
};
