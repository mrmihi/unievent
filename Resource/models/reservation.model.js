const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ReservationSchema = new Schema(
  {
    start_time: {
      type: Date,
      required: true,
    },
    end_time: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
    },
    booking_status: {
      type: String,
      enum: ['pending', 'rejected', 'approved'],
      default: 'pending',
    },
    // payment_status: {
    //   type: String,
    //   enum: ['pending', 'available', 'completed', 'unavailable'],
    //   default: 'pending',
    // },
    // price: {
    //   type: Number,
    // },
    resource: {
      type: Schema.Types.ObjectId,
      ref: 'Resource',
    },
    organizer: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
    },
    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

//ReservationSchema.plugin(mongoosePaginate);

//ReservationSchema.index({ createdAt: 1 });

const Reservation = model('Reservation', ReservationSchema);

// ReservationSchema.syncIndexes();

module.exports = Reservation;
