const router = require('express').Router();


const paymentRouter = require('./payment.routes');
const billingRouter = require('./billing.routes');

router.use('/payments', paymentRouter);
router.use('/billings', billingRouter);

module.exports = router;
