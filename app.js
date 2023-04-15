const config = require('./Event/utils/config');
const express = require('express');
require('express-async-errors');
const router = require('./Event/routes/index.routes');
const app = express();
const cors = require('cors');
const logger = require('./Event/utils/logger');
const mongoose = require('mongoose');
const errorHandler = require('./Event/middleware/error_handler');
const unknownEndpoint = require('./Event/middleware/unknown_endpoint');

logger.info('connecting to MongoDB');

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.json());
app.use('/', router);

app.use(errorHandler);
app.use(unknownEndpoint);
module.exports = app;
