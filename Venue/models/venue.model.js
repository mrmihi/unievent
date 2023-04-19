const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const VenueSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        location: {
            type: String,
            required: true
        },
        capacity: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        image_url: {
            type: String,
            required: true
        },
        manager: {
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

VenueSchema.plugin(mongoosePaginate)

VenueSchema.index({ createdAt: 1 })

const Venue = model('Venue', VenueSchema)

Venue.syncIndexes()

module.exports = Venue;
