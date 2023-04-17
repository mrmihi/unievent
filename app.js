// const config = require('./Event/utils/config');
const partnerConfig = require('./Partners/utils/config');
const express = require('express');
require('express-async-errors');
const router = require('./Event/routes/index.routes');
const partnerRouter = require('./Partners/routes/index.routes');
const app = express();
const cors = require('cors');
const logger = require('./Event/utils/logger');
const mongoose = require('mongoose');

logger.info('connecting to MongoDB');

mongoose
  .connect(partnerConfig.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.json());
app.use('/', router);
app.use('/partners', partnerRouter);

module.exports = app;
