const express = require('express');

const {
    getAllBillings,
    getBillingById,
    createBilling,
    updateBillingById,
    deleteBillingById
} = require('../controllers/billing.controller');

const billingRouter = express.Router();

// --------Routes----------
// POST /billings
billingRouter.post('/', createBilling);

// GET /billings
billingRouter.get('/', getAllBillings);

// GET /billings/:id
billingRouter.get('/:id', getBillingById);

//update billing
billingRouter.put('/:id',updateBillingById)

//delete billing by id
billingRouter.delete('/:id',deleteBillingById)

module.exports = billingRouter;

