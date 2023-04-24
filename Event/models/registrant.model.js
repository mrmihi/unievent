const mongoose = require('mongoose');

const registrantSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  fullName: {
    type: String,
    required: [true, 'Please enter your full name.'],
  },
  contactNo: {
    type: String,
    required: [true, 'Please enter a valid contact number.'],
    match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number.'],
  },
  email: {
    type: String,
    required: [true, 'Please enter a valid email.'],
  },
  foodPref: {
    type: String,
    enum: ['Veg', 'Non-Veg'],
    required: [true, 'Please select your food preference.'],
  },
});

const Registrant = mongoose.model('Registrant', registrantSchema);

module.exports = Registrant;
