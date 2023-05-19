const Payment = require('../models/payment.model');

//get all payments
const getAllPayments = async (req, res) => {
    try {
      const payments = await Payment.find(); // Find all payments in database
      res.status(200).json(payments); // Send response with payments array
    } catch (err) {
      res.status(500).json({ message: err.message }); // Handle errors
    }
  };

//get payment by id
const getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id); // Find payment by id
        res.status(200).json(payment); // Send response with payment object
    } catch (err) {
        res.status(500).json({ message: err.message }); // Handle errors
    }
};

//create payment
const createPayment = async (req, res) => {
    try {
        const newPayment = await Payment.create(req.body); // Create new payment
        res.status(201).json(newPayment); // Send response with new payment object
    } catch (err) {
        res.status(500).json({ message: err.message }); // Handle errors
    }
};

//update payment
const updatePaymentById = async (req, res) => {
  const { id } = req.params;
  const {
    start_time,
    end_time,
    duration,
    status,
    venue,
    price,
    organizer,
    paymentImage,
  } = req.body;

  try {
    const updatedPayment = await Payment.findByIdAndUpdate(
      id,
      {
        start_time,
        end_time,
        duration,
        status,
        venue,
        price,
        organizer,
        paymentImage,
      },
      { new: true }
    );

    res.status(200).json(updatedPayment);
  } catch (error) {
    res.status(500).json({ message: 'Could not update payment.' });
  }
};

//delete payment by id
const deletePaymentById = async (req, res) => {
    try {
      const{ id } = req.params;
      const payment = await Payment.findByIdAndDelete({_id: id});
      res.status(200).json(payment);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };


  module.exports = {
    getAllPayments,
    getPaymentById,
    createPayment,
    updatePaymentById,
    deletePaymentById
    };

