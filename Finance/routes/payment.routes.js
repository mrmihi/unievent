const express = require('express');

const {
    getAllPayments,
    getPaymentById,
    createPayment,
    updatePaymentById,
    deletePaymentById
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
paymentRouter.put('/:id',updatePaymentById)

//delete Payment by id
paymentRouter.delete('/:id',deletePaymentById)

module.exports = paymentRouter;

