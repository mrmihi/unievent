const router = require('express').Router();


const paymentRouter = require('./payment.routes');

router.use('/payments', paymentRouter);

module.exports = router;
