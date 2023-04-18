const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PAYMENT_STATUS = require('../constants/payment.constant');

const BillingSchema = new Schema(
  {
    transaction_id: {
      type: Schema.Types.ObjectId,
      ref: 'Payment',
      required: true,
    },
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
    venue: { type: Schema.Types.ObjectId, ref: 'Venue', required: true },
    price: { type: Number, required: true },
    organizer: {
      type: Schema.Types.ObjectId,
      ref: 'Organizer',
      required: true,
    },
    payment_status: {
        type: String,
        enum: Object.values(PAYMENT_STATUS),
        required: true,
  },
    },
  { timestamps: true }
);

const Billing = mongoose.model('Billing', BillingSchema);

module.exports = Billing;