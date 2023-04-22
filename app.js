const config = require('./Event/utils/config');
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const logger = require('./Event/utils/logger');
const mongoose = require('mongoose');
const errorHandler = require('./Event/middleware/error_handler');
const unknownEndpoint = require('./Event/middleware/unknown_endpoint');
// const Sentry = require('@sentry/node');
// const Tracing = require('@sentry/tracing');

// <-------------- Sentry Intergration Starts -------------------->

// Sentry.init({
//   dsn: process.env.SENTRY_DSN,
//   integrations: [
//     // enable HTTP calls tracing
//     new Sentry.Integrations.Http({ tracing: true }),
//     // enable Express.js middleware tracing
//     new Tracing.Integrations.Express({ app }),
//     // Automatically instrument Node.js libraries and frameworks
//     ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
//   ],

//   // Set tracesSampleRate to 1.0 to capture 100%
//   // of transactions for performance monitoring.
//   // We recommend adjusting this value in production
//   tracesSampleRate: 1.0,
// });

// // RequestHandler creates a separate execution context, so that all
// // transactions/spans/breadcrumbs are isolated across requests
// app.use(Sentry.Handlers.requestHandler());
// // TracingHandler creates a trace for every incoming request
// app.use(Sentry.Handlers.tracingHandler());

// <-------------- Sentry Intergration Ends -------------------->

const router = require('./index.routes');

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
app.use(express.static('build'));
app.use('/api', router);
app.use(unknownEndpoint);

// <-------------- Sentry Intergration Starts -------------------->

// The error handler must be before any other error middleware and after all controllers
// app.use(Sentry.Handlers.errorHandler());

// // Optional fallthrough error handler
// app.use(function onError(err, req, res, next) {
//   // The error id is attached to `res.sentry` to be returned
//   // and optionally displayed to the user for support.
//   res.statusCode = 500;
//   res.end(
//     'Unfortunately you encountered an error please get back to the team UniEventPro with the fallowing error code : \n' +
//       res.sentry +
//       '\n'
//   );
//   next();
// });

// <-------------- Sentry Intergration Ends -------------------->

app.use(errorHandler);

module.exports = app;
