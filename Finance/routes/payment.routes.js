const express = require('express');

const {
    getAllPayments,
    getPaymentById,
    createPayment,
    updatePayment,
} = require('../controllers/payment.controller');

const paymentRouter = express.Router();

// --------Routes----------
// POST /payments
paymentRouter.post('/', createPayment);

// GET /payments
paymentRouter.get('/', getAllPayments);

// GET /payments/:id
paymentRouter.get('/:id', getPaymentById);

//update Payment
paymentRouter.put('/:id',updatePayment)

module.exports = paymentRouter;

