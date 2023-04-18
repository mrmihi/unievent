const express = require('express');
const router = express.Router();

const {
    getAllPayments,
    getPaymentById,
    createPayment,
} = require('../controllers/payment.controller');

// --------Routes----------
// POST /payments
router.post('/', createPayment);

// GET /payments
router.get('/', getAllPayments);

// GET /payments/:id
router.get('/:id', getPaymentById);

module.exports = router;

