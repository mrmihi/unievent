const Billing = require('../models/billing.model');

//get all billings
const getAllBillings = async (req, res) => {
    try {
      const billings = await Billing.find(); // Find all billings in database
      res.status(200).json(billings); // Send response with billings array
    } catch (err) {
      res.status(500).json({ message: err.message }); // Handle errors
    }
  };

//get billing by id
const getBillingById = async (req, res) => {
    try {
        const billing = await Billing.findById(req.params.id); // Find billing by id
        res.status(200).json(billing); // Send response with billing object
    } catch (err) {
        res.status(500).json({ message: err.message }); // Handle errors
    }
};

//create billing
const createBilling = async (req, res) => {
    try {
        const newBilling = await Billing.create(req.body); // Create new billing
        res.status(201).json(newBilling); // Send response with new billing object
    } catch (err) {
        res.status(500).json({ message: err.message }); // Handle errors
    }
};

//update billing by id
const updateBillingById = async (req, res) => {
    try{
        const{ id } = req.params;
        const billing =await Billing.findByIdAndUpdate({_id: id}, req.body, {new: true, runValidators: true});
        res.status(200).json(billing);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//delete billing by id
const deleteBillingById = async (req, res) => {
    try{
        const{ id } = req.params;
        const billing =await Billing.findByIdAndDelete({_id: id});
        res.status(200).json(billing);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllBillings,
    getBillingById,
    createBilling,
    updateBillingById,
    deleteBillingById
};