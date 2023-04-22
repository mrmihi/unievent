const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const BookingSchema = new Schema(
    {
        start_time: {
            type: Date,
            required: true,
        },
        end_time: {
            type: Date,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        booking_status: {
            type: String,
            enum: ['pending', 'rejected', 'completed'],
            default: 'pending',
            required: true
        },
        payment_status: {
            type: String,
            enum: ['pending', 'available', 'completed', 'unavailable'],
            default: 'pending',
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        venue: {
            type: Schema.Types.ObjectId,
            ref: 'Venue',
            required: true
        },
        organizer: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        versionKey: false,
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
)

BookingSchema.plugin(mongoosePaginate)

BookingSchema.index({ createdAt: 1 })

const Booking = model('Booking', BookingSchema)

Booking.syncIndexes()

module.exports = Booking;
