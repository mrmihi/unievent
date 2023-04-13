const express = require('express');
const config = require('./utils/config');
require('express-async-errors');

const app = express();
const cors = require('cors');
const blogRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });
