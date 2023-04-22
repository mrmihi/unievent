const { Schema, model } = require('mongoose');

const reservationSchema = new Schema(
  {
    eventId: {
      type: String,
      required: true,
    },
    itemId: {
      type: String,
      required: true,
    },
    Date: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = model('Reservation', reservationSchema);
